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

  (["front", "top", "back", "side"] as PhotoKey[]).forEach((key) => {
    const file = payload.photos[key];
    if (file) form.append(`photo_${key}`, file);
  });

  const res = await fetch("/api/submit", { method: "POST", body: form });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Submission failed." }));
    throw new Error(data.error ?? "Submission failed.");
  }
}
