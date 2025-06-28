import "server-only";

import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod";
import { describeRoute, generateSpecs, openAPISpecs } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { authRouter } from "~/server/routers/auth";
import { auth, type AuthType } from "~/lib/auth";
import { swaggerUI } from "@hono/swagger-ui";
import fs from "node:fs";

export const app = new Hono<{ Variables: AuthType }>().basePath("/api");

app.use(logger());

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.route("/auth", authRouter);

const helloSchema = z.object({
  message: z.string(),
});

app.get(
  "/hello",
  describeRoute({
    description: "Greeting from Hono",
    validateResponse: true,
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": { schema: resolver(helloSchema) },
        },
      },
    },
  }),
  // validator("query", helloSchema),
  // validator("param", helloSchema),
  (c) => {
    return c.json({
      message: "Hello from Hono!",
    });
  },
);
app.get("/ui", swaggerUI({ url: "/api/openapi" }));

app.get(
  "/openapi",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "Echo Habit API",
        version: "0.0.1",
        description: "Hono API",
      },
      // servers: [
      //   { url: "http://localhost:3000/api", description: "Local Server" },
      // ],
    },
  }),
);

void generateSpecs(app).then((spec) => {
  const pathToSpec = "openapi.json";
  fs.writeFileSync(pathToSpec, JSON.stringify(spec, null, 2));
});

export type ApiRoutes = typeof app;
