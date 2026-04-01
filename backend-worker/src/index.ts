import { createApp, createDb } from './db';
import emotionsRoute from './routes/emotions';
import type { Env } from './db';

const app = createApp();

// Health check
app.get('/', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Middleware to inject db
app.use('*', async (c, next) => {
  const db = createDb(c.env.DB);
  c.set('db', db);
  await next();
});

// Routes
app.route('/emotions', emotionsRoute);

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

// Export for Cloudflare Workers
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return app.fetch(request, env, ctx);
  },
};
