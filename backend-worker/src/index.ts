import { createApp, createDb } from './db';
import emotionsRoute from './routes/emotions';

const app = createApp();

// Health check
app.get('/', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
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
    const db = createDb(env.DB);
    return app.fetch(request, { ...env, db }, ctx);
  },
};
