import { createClient } from "@supabase/supabase-js";

// Server-only client. Uses the secret key to bypass RLS.
// NEVER import this into a client component — the key must stay on the server.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
  auth: { persistSession: false },
});
