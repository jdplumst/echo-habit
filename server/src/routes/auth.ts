import { Hono } from "hono";
import { auth } from "../utils/auth";

export const authRouter = new Hono<{ Bindings: CloudflareBindings }>();

authRouter.on(["POST", "GET"], "/api/auth/**", (c) => {
  return auth(c.env).handler(c.req.raw);
});
