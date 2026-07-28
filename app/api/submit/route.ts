import { NextRequest, NextResponse } from "next/server";
import { createApplication, uploadPhoto } from "../../lib/airtable";
import { sendAdminNotification, sendApplicantConfirmation } from "../../lib/emails";

const PHOTO_KEYS = ["front", "top", "back", "side"] as const;

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

    // 1) Create the Airtable record with the text data
    const recordId = await createApplication({
      firstName,
      lastName,
      email,
      phone,
      age,
      cityState,
      hairLossStory,
      whyMe,
      consent,
    });

    // 2) Upload the photos to the record (sequential — Airtable appends to the
    //    attachment field, and concurrent appends can race). Non-fatal: a photo
    //    hiccup shouldn't lose the application that's already saved.
    for (const key of PHOTO_KEYS) {
      const file = form.get(`photo_${key}`) as File | null;
      if (file && file.size > 0) {
        try {
          await uploadPhoto(recordId, key, file);
        } catch (photoErr) {
          console.error(`Photo upload failed (${key}):`, photoErr);
        }
      }
    }

    // 3) Fire both emails — non-blocking. A mail failure must never fail the
    //    submission, since the record is already safely saved.
    const summary = {
      firstName,
      lastName,
      email,
      phone,
      age,
      cityState,
      hairLossStory,
      whyMe,
      applicationId: recordId,
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
