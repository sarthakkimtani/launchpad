import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/", async (request, reply) => {
  return { message: "Hello Fastify 🚀" };
});

const start = async () => {
  try {
    await app.listen({ port: 8000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
