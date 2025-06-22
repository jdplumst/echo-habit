import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "node:process";

export const db = drizzle({
  connection: {
    url: env["DATABASE_URL"]!,
    authToken: env["DATABASE_TOKEN"],
  },
});
