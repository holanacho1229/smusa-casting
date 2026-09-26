import { compressImage } from "./compressImage";

type PhotoKey = "front" | "top" | "back" | "side";

interface SubmitPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  cityState: string;
  hairLossStory: string;
  whyMe: string;
  photos: Record<PhotoKey, File | null>;
  consent: boolean;
}

export async function submitApplication(payload: SubmitPayload): Promise<void> {
  const form = new FormData();
  form.append("firstName", payload.firstName);
  form.append("lastName", payload.lastName);
  form.append("email", payload.email);
  form.append("phone", payload.phone);
  form.append("age", payload.age);
  form.append("cityState", payload.cityState);
  form.append("hairLossStory", payload.hairLossStory);
  form.append("whyMe", payload.whyMe);
  form.append("consent", String(payload.consent));

  // Downscale/compress each photo in the browser first. Keeps the total request
  // body under Vercel's 4.5MB serverless limit (otherwise the platform rejects
  // real phone photos with a 413 before the route runs).
  const keys: PhotoKey[] = ["front", "top", "back", "side"];
  const compressed = await Promise.all(
    keys.map((key) => {
      const file = payload.photos[key];
      return file ? compressImage(file) : Promise.resolve(null);
    })
  );
  keys.forEach((key, i) => {
    const file = compressed[i];
    if (file) form.append(`photo_${key}`, file);
  });

  const res = await fetch("/api/submit", { method: "POST", body: form });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Submission failed." }));
    throw new Error(data.error ?? "Submission failed.");
  }
}
