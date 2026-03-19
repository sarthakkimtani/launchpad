import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${process.env.BACKEND_URL}/auth`,
});

export type Session = typeof authClient.$Infer.Session;
