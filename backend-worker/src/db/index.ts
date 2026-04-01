import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import * as schema from './schema';

export type Env = {
  DB: D1Database;
  FRONTEND_URL: string;
  NODE_ENV: string;
};

export type AppContext = {
  Bindings: Env;
};

export const createApp = () => {
  const app = new Hono<AppContext>();

  // CORS
  app.use('*', cors({
    origin: (origin) => origin,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  }));

  return app;
};

export const createDb = (d1: D1Database) => {
  return drizzle(d1, { schema });
};
