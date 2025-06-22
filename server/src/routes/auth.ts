import { Hono } from "hono";
import { auth } from "../utils/auth";

export const authRouter = new Hono();

authRouter.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));
