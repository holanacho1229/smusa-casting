import { supabase } from "./supabase";

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

async function uploadPhoto(
  applicationId: string,
  key: PhotoKey,
  file: File
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${applicationId}/${key}.${ext}`;

  const { error } = await supabase.storage
    .from("applicant-photos")
    .upload(path, file, { upsert: true });

  if (error) throw new Error(`Photo upload failed (${key}): ${error.message}`);

  const { data } = supabase.storage
    .from("applicant-photos")
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function submitApplication(payload: SubmitPayload): Promise<void> {
  // Generate an ID upfront so photo paths are tied to the record
  const applicationId = crypto.randomUUID();

  // Upload all photos in parallel
  const photoKeys: PhotoKey[] = ["front", "top", "back", "side"];
  const photoUrls = await Promise.all(
    photoKeys.map((key) =>
      payload.photos[key]
        ? uploadPhoto(applicationId, key, payload.photos[key]!)
        : Promise.resolve(null)
    )
  );

  const [frontUrl, topUrl, backUrl, sideUrl] = photoUrls;

  const { error } = await supabase.from("applications").insert({
    id: applicationId,
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    age: parseInt(payload.age, 10),
    city_state: payload.cityState,
    hair_loss_story: payload.hairLossStory,
    why_me: payload.whyMe,
    photo_front_url: frontUrl,
    photo_top_url: topUrl,
    photo_back_url: backUrl,
    photo_side_url: sideUrl,
    consent: payload.consent,
    status: "pending",
  });

  if (error) throw new Error(`Application insert failed: ${error.message}`);
}
