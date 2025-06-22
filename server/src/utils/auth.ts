import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/libsql";

export const auth = (
  env: CloudflareBindings
): ReturnType<typeof betterAuth> => {
  const db = drizzle({
    connection: {
      url: env.DATABASE_URL!,
      authToken: env.DATABASE_TOKEN,
    },
  });

  return betterAuth({
    database: drizzleAdapter(db, { provider: "sqlite" }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
  });
};
