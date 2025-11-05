import { Hono } from "hono";

const art = new Hono();

art.get("/art", (c) => {
  return c.json({
    message: "art route works!",
  });
});

export default art;
