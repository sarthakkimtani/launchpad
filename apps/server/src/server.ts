import fastifyCors from "@fastify/cors";
import Fastify from "fastify";

import { betterAuthHandler } from "@/lib/auth/handler";

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
});

app.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

app.route({ method: ["GET", "POST"], url: "/auth/*", handler: betterAuthHandler });

const start = async () => {
  try {
    await app.listen({ port: 8000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
