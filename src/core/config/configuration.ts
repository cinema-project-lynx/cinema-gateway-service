import validationSchema from './validation.schema';

export default () => {
  const parsed = validationSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.format());
    process.exit(1);
  }

  const env = parsed.data;

  return {
    NODE_ENV: env.NODE_ENV,
    HTTP_PORT: env.HTTP_PORT,
    HTTP_HOST: env.HTTP_HOST,
    HTTP_CORS: env.HTTP_CORS,
    COOKIES_DOMAIN: env.COOKIES_DOMAIN,
    COOKIE_SECRET: env.COOKIE_SECRET,
    AUTH_GRPC_URL: env.AUTH_GRPC_URL,
    ACCOUNT_GRPC_URL: env.ACCOUNT_GRPC_URL,
    PASSPORT_SECRET_KEY: env.PASSPORT_SECRET_KEY,
  };
};
