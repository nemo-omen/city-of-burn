import 'dotenv/config';

export const dbVars = {
  password: process.env.SUPABASE_PASSWORD,
  anonkey: process.env.SUPABASE_ANON_KEY,
  service: process.env.SUPABASE_SERVICE,
  url: process.env.SUPABASE_URL,
  secret: process.env.SUPABASE_JWT_SECRET
};