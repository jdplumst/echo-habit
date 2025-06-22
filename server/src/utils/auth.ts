import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/libsql";

export function getAuth(
  env: CloudflareBindings
): ReturnType<typeof betterAuth> {
  const db = drizzle({
    connection: {
      url: env.DATABASE_URL!,
      authToken: env.DATABASE_TOKEN,
    },
  });

  return betterAuth({
    database: drizzleAdapter(db, { provider: "sqlite" }),
  });
}
