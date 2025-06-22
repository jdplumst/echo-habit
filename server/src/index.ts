import { Hono } from "hono";
import { Session, User } from "better-auth";
import { auth } from "@/utils/auth";
import { authRouter } from "@/routes/auth";

export type AppBindings = {
  Bindings: CloudflareBindings;
  Variables: {
    user: User | null;
    session: Session | null;
  };
};

const app = new Hono<AppBindings>();

app.use("*", async (c, next) => {
  const session = await auth(c.env).api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.route("/api/auth", authRouter);

export default app;
