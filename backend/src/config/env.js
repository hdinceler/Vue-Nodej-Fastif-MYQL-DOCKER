export const envSchema = {
  type: 'object',
  required: [
    'APP_NAME',
    'APP_ENV',
    'API_HOST',
    'API_PORT',
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'JWT_SECRET',
    'JWT_EXPIRES_IN',
    'REDIS_HOST',
    'REDIS_PORT'
  ],
  properties: {
    APP_NAME: { type: 'string' },
    APP_ENV: { type: 'string' },

    API_HOST: { type: 'string' },
    API_PORT: { type: 'number' },

    DB_HOST: { type: 'string' },
    DB_PORT: { type: 'number' },
    DB_NAME: { type: 'string' },
    DB_USER: { type: 'string' },
    DB_PASSWORD: { type: 'string' },

    JWT_SECRET: { type: 'string' },
    JWT_EXPIRES_IN: { type: 'string' },

    REDIS_HOST: { type: 'string' },
    REDIS_PORT: { type: 'number' },
    REDIS_PASSWORD: { type: 'string', nullable: true }
  }
};
