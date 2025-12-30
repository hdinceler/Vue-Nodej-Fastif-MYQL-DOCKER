import fp from 'fastify-plugin';
import env from '@fastify/env';

export default fp(async (fastify) => {
  try {
    await fastify.register(env, {
      schema: fastify.envSchema ?? undefined,
      dotenv: fastify.config?.APP_ENV !== 'production',
      confKey: 'config',
      data: process.env,
      decorate: true
    });

    fastify.log.info(
      {
        app: fastify.config.APP_NAME,
        env: fastify.config.APP_ENV
      },
      'Environment loaded'
    );

  } catch (err) {
    fastify.log.fatal(err, 'ENV validation failed');
    process.exit(1);
  }
});
