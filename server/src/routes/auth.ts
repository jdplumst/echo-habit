import { AppBindings } from "@/index";
import { auth } from "@/utils/auth";
import { Hono } from "hono";

export const authRouter = new Hono<AppBindings>();

authRouter.on(["POST", "GET"], "/**", (c) => {
  return auth(c.env).handler(c.req.raw);
});
