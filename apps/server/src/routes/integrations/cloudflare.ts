import Cloudflare from "cloudflare";
import { FastifyInstance } from "fastify";

import { db } from "@/lib/db";
import { integration } from "@/lib/db/schema";
import { encrypt } from "@/lib/encryption";

type ConnectionRequestBody = {
  accessToken: string;
  externalAccountId: string;
};

export default async function cloudflareRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: ConnectionRequestBody }>("/connect", async (request, reply) => {
    const { accessToken, externalAccountId } = request.body;

    if (accessToken.length === 0 || externalAccountId.length === 0) {
      return reply.status(400).send({ error: "Invalid request body" });
    }

    try {
      const cf = new Cloudflare({ apiToken: accessToken });
      const account = await cf.accounts.get({ account_id: externalAccountId });
      const encryptedToken = encrypt(accessToken);

      await db.insert(integration).values({
        externalAccountId,
        accessToken: encryptedToken,
        userId: request.auth!.user.id,
        provider: "cloudflare",
        metadata: {
          name: account.name,
        },
      });
    } catch (err) {
      fastify.log.warn(err);
      return reply.status(500).send({ error: "Something went wrong." });
    }
  });
}
