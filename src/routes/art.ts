import { Hono } from "hono";
import { ArtPieceModel } from "../models/Art.js";

const art = new Hono();

art.get("/", async (c) => {
  const arts = await ArtPieceModel.find({});
  return c.json(arts);
});

export default art;
