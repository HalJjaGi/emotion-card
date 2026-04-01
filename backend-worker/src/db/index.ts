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

  // Manual CORS headers (more reliable)
  app.use('*', async (c, next) => {
    await next();
    c.header('Access-Control-Allow-Origin', '*');
    c.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  });

  // Handle OPTIONS requests
  app.options('*', (c) => c.text('', 204));

  return app;
};

export const createDb = (d1: D1Database) => {
  return drizzle(d1, { schema });
};
