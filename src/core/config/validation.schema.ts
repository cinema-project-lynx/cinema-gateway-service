import z from 'zod';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

const portSchema = z.coerce.number().int().min(1).max(65535);

export default z.object({
  NODE_ENV: z
    .enum([Environment.Development, Environment.Production, Environment.Test])
    .default(Environment.Development),

  HTTP_PORT: portSchema,
  HTTP_HOST: z.string().min(1),
  HTTP_CORS: z.string().min(1),

  COOKIES_DOMAIN: z.string().min(1),
  COOKIE_SECRET: z.string().min(1),

  AUTH_GRPC_URL: z.string().min(1),
  ACCOUNT_GRPC_URL: z.string().min(1),

  PASSPORT_SECRET_KEY: z.string().min(1),
});
