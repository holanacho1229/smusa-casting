# Incident Log

A running record of production incidents, their root cause, and the fix — so
recurring or related issues can be diagnosed quickly.

---

## 2026-09-25 — Form submissions failing with "Something went wrong"

**Symptom.** Applicants completing the form and tapping **Submit Application** saw
the red error *"Something went wrong — check your connection and try again."* The
site and form UI worked; only the final submission failed. Had been working fine
(verified end-to-end on 2026-09-01).

**Diagnosis.**
- Airtable token + API: healthy (metadata `200`, record create `200`).
- Production `/api/submit` with text fields only: `{"ok":true}` `200` — the route
  itself was fine.
- Production `/api/submit` **with ~6MB of real photos**: **`413 Request Entity Too
  Large` / `FUNCTION_PAYLOAD_TOO_LARGE`** returned by the Vercel platform *before*
  our function ran.

**Root cause.** Vercel serverless functions reject any request whose body exceeds
**4.5MB**. The form uploads 4 photos in one `multipart/form-data` POST. Real phone
photos are ~3–5MB **each**, so the combined body blew past 4.5MB and the platform
rejected it. It "worked" on 2026-09-01 only because that test used small
screenshots (~1–2MB total); the first real applicant with full-resolution phone
photos tripped the limit. Photo-upload and email errors inside the route are
non-fatal, which is why the failure was purely at the request/platform layer.

**Fix.** Compress/downscale each photo **in the browser** before upload.
- New util `app/lib/compressImage.ts` — `createImageBitmap` → canvas downscale
  (longest edge ≤1600px, progressive passes down to 1024px) → JPEG encode
  (quality 0.82→0.6), targeting ≤~1MB per photo. Falls back to the original file
  on any decode/encode failure.
- `app/lib/submitApplication.ts` compresses all photos (`Promise.all`) before
  appending them to the `FormData`.
- Measured: a 1.5MB photo → ~190KB (~88% smaller). Four photos now total well
  under 1MB vs. the old ~6MB, comfortably under the 4.5MB cap. Also faster uploads.

**Prevention / notes.**
- Do **not** raise photo resolution or add more photos without re-checking the
  compressed total against the 4.5MB serverless body limit.
- If future needs require larger/original-resolution uploads, move photos off the
  serverless request path entirely — upload directly from the client to storage
  (e.g., a signed Airtable/S3/Blob upload URL) and send only the resulting short
  URL to `/api/submit`. (Also aligns with the Salesforce short-URL requirement.)
- HEIC edge case: iOS Safari normally hands the file input a JPEG; if a raw HEIC
  ever reaches `compressImage` and can't be decoded, it falls back to the original
  and could still be large. Not observed, but worth remembering.

### Audit of existing submissions (done same day)

Reviewed every real submission in the Airtable base. The bug was worse than a
single-day outage — large photos also caused **partial/missing photo uploads on
records that DID save** (the record is created before photos upload; individual
large photos then failed and/or the function ran long, leaving the text saved but
photos incomplete). Findings:

| Applicant | Text/consent | Photos |
| --- | --- | --- |
| Fernando Peguero | ✅ saved | ✅ 4/4 (photos happened to be small enough) |
| Ryan Crespin | ✅ saved | ⚠️ 1/4 (front only) |
| Robert Rosenbaum | ✅ saved | ❌ 0/4 |
| Matthew Iulo (owner test) | ✅ saved | ✅ 4/4 (used small site screenshots) |

The lost photos are **not recoverable** (the uploads never landed). **Follow-up:
contact Ryan Crespin and Robert Rosenbaum to re-request their 4 photos.** Also note
their confirmation email may not have sent if the function errored before the email
step — worth a manual check / personal outreach.

**Fix verified against real large photos:** an end-to-end test submitted four
1.5–2MB images through the production endpoint; compression brought the total to
806KB and **all four attached** to the resulting Airtable record (`E2E CompressTest`)
with a `200` response — vs. the raw 6MB version which returned `413`. So the single
compression fix resolves both the outright 413 failure and the partial-photo loss.

Log note: Vercel runtime logs beyond ~1 day require the paid Observability Plus
add-on, so the historical error lines for these applicants were no longer
retained; root cause was established from the Airtable data + a live reproduction.
