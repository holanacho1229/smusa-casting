// Client-side image compression. Runs in the browser before upload so the
// request body stays well under Vercel's 4.5MB serverless-function limit
// (real phone photos are 3–5MB each; four of them exceed the cap and the
// platform rejects the request with 413 FUNCTION_PAYLOAD_TOO_LARGE before our
// route ever runs). Casting-review photos don't need full resolution, so we
// downscale + JPEG-encode. Falls back to the original file on any failure.

const TARGET_BYTES = 1_000_000; // aim for <= ~1MB per photo
const PASSES = [
  { maxEdge: 1600, quality: 0.82 },
  { maxEdge: 1280, quality: 0.72 },
  { maxEdge: 1024, quality: 0.6 },
];

function toJpgName(name: string): string {
  return name.replace(/\.[^.]+$/, "") + ".jpg" || "photo.jpg";
}

export async function compressImage(file: File): Promise<File> {
  if (typeof document === "undefined") return file; // SSR guard
  if (!file.type.startsWith("image/")) return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file; // e.g. a format the browser can't decode — send as-is
  }

  let best = file;
  try {
    for (const pass of PASSES) {
      const scale = Math.min(1, pass.maxEdge / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) break;
      ctx.drawImage(bitmap, 0, 0, w, h);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", pass.quality)
      );
      if (blob && blob.size < best.size) {
        best = new File([blob], toJpgName(file.name), {
          type: "image/jpeg",
          lastModified: Date.now(),
        });
      }
      if (best.size <= TARGET_BYTES) break; // small enough — stop early
    }
  } finally {
    bitmap.close?.();
  }

  return best;
}
