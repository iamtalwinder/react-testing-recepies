type AppEnv = 'production' | 'development';

export function getAppEnv(): AppEnv {
  return process.env.NODE_ENV as AppEnv;
}
