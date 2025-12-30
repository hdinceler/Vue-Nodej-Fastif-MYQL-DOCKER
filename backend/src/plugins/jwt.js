import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

export default fp(async (fastify) => {
  const { JWT_SECRET, JWT_EXPIRES_IN } = fastify.config;

  if (!JWT_SECRET || JWT_SECRET.length < 32) {
    fastify.log.fatal('JWT_SECRET too short or missing');
    process.exit(1);
  }

  await fastify.register(jwt, {
    secret: JWT_SECRET,
    sign: {
      expiresIn: JWT_EXPIRES_IN
    }
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  });

  fastify.log.info('JWT plugin loaded');
});
