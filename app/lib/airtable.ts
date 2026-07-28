// Airtable backend for casting applications. Server-only (uses the PAT).
const TOKEN = process.env.AIRTABLE_TOKEN!;
const BASE = process.env.AIRTABLE_BASE_ID!;
const TABLE = process.env.AIRTABLE_TABLE_ID!;
const PHOTOS_FIELD = "Photos"; // multipleAttachments field

export interface ApplicationFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  cityState: string;
  hairLossStory: string;
  whyMe: string;
  consent: boolean;
}

// Create the application record. Returns the Airtable record id.
export async function createApplication(f: ApplicationFields): Promise<string> {
  const res = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      typecast: true, // lets "Status" auto-create the "pending" option
      fields: {
        Name: `${f.firstName} ${f.lastName}`.trim(),
        "First Name": f.firstName,
        "Last Name": f.lastName,
        Email: f.email,
        Phone: f.phone,
        Age: parseInt(f.age, 10),
        "City & State": f.cityState,
        "Hair Loss Story": f.hairLossStory,
        "Why Me": f.whyMe,
        Consent: f.consent,
        Status: "pending",
      },
    }),
  });
  if (!res.ok) {
    throw new Error(`Airtable create failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.id as string;
}

// Upload one photo to the record's Photos attachment field (appends).
export async function uploadPhoto(
  recordId: string,
  key: string,
  file: File
): Promise<void> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop() || "jpg";
  const res = await fetch(
    `https://content.airtable.com/v0/${BASE}/${recordId}/${PHOTOS_FIELD}/uploadAttachment`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contentType: file.type || "image/jpeg",
        filename: `${key}.${ext}`,
        file: buffer.toString("base64"),
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`Photo upload failed (${key}): ${res.status} ${await res.text()}`);
  }
}
