import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs/promises";
import art from "./routes/art.js";
import { connectDB } from "./db/db.js";

const app = new Hono();

connectDB()
  .then(() => {
    console.log("App ready!");
  })
  .catch(console.error);

app.use("/*", serveStatic({ root: "./src/static" }));

app.get("/", async (c) => {
  const html = await fs.readFile("./src/static/index.html", "utf8");
  return c.html(html);
});

app.route("/art", art);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
