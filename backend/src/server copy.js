import Fastify from 'fastify';

import envPlugin from './plugins/env.js';
import dbPlugin from './plugins/db.js';
import redisPlugin from './plugins/redis.js';
import jwtPlugin from './plugins/jwt.js';

import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';

const app = Fastify({ logger: true });

/**
 * CORE PLUGINS
 * Sıra kritik
 */
await app.register(envPlugin);
await app.register(dbPlugin);
await app.register(redisPlugin);
await app.register(jwtPlugin);

/**
 * ROUTES
 */
await app.register(authRoutes, { prefix: '/auth' });
await app.register(profileRoutes, { prefix: '/profile' });

/**
 * HEALTH CHECK
 */
app.get('/', async () => {
  return {
    app: app.config.APP_NAME,
    env: app.config.APP_ENV,
    redis: await app.redis.ping(),
    status: 'ok'
  };
});

/**
 * START SERVER
 */
await app.listen({
  host: app.config.API_HOST,
  // host: '0.0.0.0',  
  port: Number(app.config.API_PORT) || 3000
});
