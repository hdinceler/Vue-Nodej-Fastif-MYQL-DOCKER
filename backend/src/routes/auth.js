import bcrypt from 'bcrypt';

export default async function authRoutes(fastify) {

  // REGISTER
  fastify.post('/register', async (request, reply) => {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return reply.code(400).send({ error: 'Missing fields' });
    }

    const [exists] = await fastify.db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (exists.length > 0) {
      return reply.code(409).send({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await fastify.db.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );

    return reply.code(201).send({ status: 'registered' });
  });

  // LOGIN
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;

    const [rows] = await fastify.db.execute(
      'SELECT id, password_hash, role FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const token = fastify.jwt.sign({
      uid: user.id,
      role: user.role
    });

    return {
      token
    };
  });
}
