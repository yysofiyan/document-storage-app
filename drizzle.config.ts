import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: "41ee49651a4f24dd8f3f87f0bb0614c6",
    databaseId: "a500db57-c0b5-4ee0-b54b-736b465b7a5e",
    token: process.env.CLOUDFLARE_API_TOKEN!,
  },
});
