import { serve } from "@hono/node-server";
import { Hono } from "hono";
import art from "./routes/art.js";

const app = new Hono();
import { connectDB } from "./db/db.js";

connectDB()
  .then(() => {
    console.log("App ready!");
  })
  .catch(console.error);

app.get("/", (c) => c.text("Hello, Masterpiece Hub!"));

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
