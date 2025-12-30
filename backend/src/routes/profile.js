export default async function profileRoutes(fastify) {

  fastify.get(
    '/me',
    { preHandler: fastify.authenticate },
    async (request) => {
      const { uid } = request.user;

      const [rows] = await fastify.db.execute(
        'SELECT id, name, email, role FROM users WHERE id = ?',
        [uid]
      );

      return rows[0];
    }
  );
}
