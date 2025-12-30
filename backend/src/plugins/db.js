import fp from 'fastify-plugin';
import mysql from 'mysql2/promise';

export default fp(async (fastify) => {
  const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD
  } = fastify.config;

  let pool;

  try {
    pool = mysql.createPool({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      timezone: 'Z'
    });

    // Smoke test
    await pool.query('SELECT 1');

    fastify.decorate('db', pool);

    fastify.log.info('MariaDB connected');
  } catch (err) {
    fastify.log.fatal(err, 'MariaDB connection failed');
    process.exit(1);
  }

  fastify.addHook('onClose', async () => {
    if (pool) await pool.end();
  });
});
