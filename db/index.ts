import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const getDb = (env?: any) => {
    if (env) {
        return drizzle(env.DB, { schema });
    }

    // Fallback to getRequestContext for Next.js App Router
    try {
        const context = getRequestContext();
        if (context && context.env && context.env.DB) {
            return drizzle(context.env.DB, { schema });
        }
    } catch (e) {
        // Ignore error if not in Cloudflare context
    }

    throw new Error("Database binding not found. Ensure you are running in a Cloudflare environment or pass the env object.");
};

