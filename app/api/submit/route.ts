import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { sendAdminNotification, sendApplicantConfirmation } from "../../lib/emails";

const BUCKET = "applicant photos";
const PHOTO_KEYS = ["front", "top", "back", "side"] as const;
type PhotoKey = (typeof PHOTO_KEYS)[number];

async function uploadPhoto(
  applicationId: string,
  key: PhotoKey,
  file: File
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${applicationId}/${key}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: file.type, upsert: true });

  if (error) throw new Error(`Photo upload failed (${key}): ${error.message}`);

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();

    // Pull text fields
    const get = (k: string) => (form.get(k) as string | null)?.trim() ?? "";
    const firstName = get("firstName");
    const lastName = get("lastName");
    const email = get("email");
    const phone = get("phone");
    const age = get("age");
    const cityState = get("cityState");
    const hairLossStory = get("hairLossStory");
    const whyMe = get("whyMe");
    const consent = form.get("consent") === "true";

    // Server-side validation — never trust the client alone
    if (!firstName || !lastName || !email || !phone || !age || !cityState) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ error: "Consent is required." }, { status: 400 });
    }

    const applicationId = crypto.randomUUID();

    // Upload all four photos in parallel
    const urls = await Promise.all(
      PHOTO_KEYS.map((key) => {
        const file = form.get(`photo_${key}`) as File | null;
        return file && file.size > 0
          ? uploadPhoto(applicationId, key, file)
          : Promise.resolve(null);
      })
    );
    const [frontUrl, topUrl, backUrl, sideUrl] = urls;

    const { error } = await supabaseAdmin.from("applications").insert({
      id: applicationId,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      age: parseInt(age, 10),
      city_state: cityState,
      hair_loss_story: hairLossStory,
      why_me: whyMe,
      photo_front_url: frontUrl,
      photo_top_url: topUrl,
      photo_back_url: backUrl,
      photo_side_url: sideUrl,
      consent,
      status: "pending",
    });

    if (error) {
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    // Fire both emails — non-blocking. A mail failure must never fail the
    // submission, since the record is already safely saved.
    const summary = {
      firstName,
      lastName,
      email,
      phone,
      age,
      cityState,
      hairLossStory,
      whyMe,
      applicationId,
    };
    try {
      await Promise.allSettled([
        sendAdminNotification(summary),
        sendApplicantConfirmation(summary),
      ]);
    } catch (mailErr) {
      console.error("Email send failed (submission still saved):", mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
