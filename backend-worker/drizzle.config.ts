import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: '911eccc46203fd2ed8346d6c9f9e7184',
    databaseId: 'a2c67533-f389-4c1d-b4e5-86559cfd54ea',
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
});
