import fp from 'fastify-plugin';
import Redis from 'ioredis';

export default fp(async (fastify) => {
  const {
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD
  } = fastify.config;

  let client;

  try {
    client = new Redis({
      host: REDIS_HOST,
      port: Number(REDIS_PORT),
      password: REDIS_PASSWORD || undefined,
      lazyConnect: true,
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      connectTimeout: 5000
    });

    await client.connect();
    await client.ping();

    fastify.decorate('redis', client);

    fastify.log.info('Redis connected');
  } catch (err) {
    fastify.log.fatal(err, 'Redis connection failed');
    process.exit(1);
  }

  fastify.addHook('onClose', async () => {
    if (client) await client.quit();
  });
});
