import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import * as schema from './schema';

export type Env = {
  DB: D1Database;
  FRONTEND_URL: string;
  NODE_ENV: string;
  Variables: {
    db: ReturnType<typeof drizzle<typeof schema>>;
  };
};

export type AppContext = {
  Bindings: Env;
};

export const createApp = () => {
  const app = new Hono<Env>();

  // CORS 설정 - 특정 도메인만 허용
  app.use('*', async (c, next) => {
    const origin = c.req.header('origin');
    const allowedOrigins = [
      'https://emotion-card-frontend.pages.dev',
      'http://localhost:3000',
      'http://localhost:3001',
    ];
    
    if (origin && allowedOrigins.includes(origin)) {
      c.header('Access-Control-Allow-Origin', origin);
    }
    c.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    c.header('Access-Control-Allow-Credentials', 'true');
    await next();
  });

  // Handle OPTIONS requests
  app.options('*', (c) => c.text('', 204));

  return app;
};

export const createDb = (d1: D1Database) => {
  return drizzle(d1, { schema });
};
