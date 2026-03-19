import { authClient } from "@/lib/auth-client";

export const getSession = async (cookie: string) => {
  return await authClient.getSession({
    fetchOptions: { headers: { cookie } },
  });
};
