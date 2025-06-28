import 'dotenv/config';

const jwtSecret = process.env.SECRET;
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.SERVER_PORT || 3001;
const origins = process.env.ORIGINS?.split(';') || 'http://localhost:3000';

export const config = {
  app: {
    port,
    isProduction,
  },
  cors: {
    origins,
    credentials: true,
  },
  jwt: {
    jwtSecret,
    jwtExpiresIn: 3600000 / 2,
    jwtRefreshExpiresIn: 3600000, // 1hr
  },
  pushNotification: {
    token: process.env.EXPO_ACCESS_TOKEN,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
};
