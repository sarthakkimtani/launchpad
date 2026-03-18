import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/lib/db";

export const auth = betterAuth({
  trustedOrigins: [process.env.CLIENT_ORIGIN!],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
