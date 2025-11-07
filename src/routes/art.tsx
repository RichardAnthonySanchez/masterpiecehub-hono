import { Hono } from "hono";
import { ArtPiece, ArtPieceModel } from "../models/Art.js";
import type { FC } from "hono/jsx";

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
};

const Top: FC<{ eras: string[] }> = ({ eras }) => {
  return (
    <Layout>
      <h1>Art Movements</h1>
      <ul>
        {eras.map((era) => (
          <li key={era}>
            <a href={`/art/${encodeURIComponent(era.toLowerCase())}`}>{era}</a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

const art = new Hono();

art.get("/", async (c) => {
  const distinctEras = await ArtPieceModel.distinct("era", {
    era: { $exists: true, $ne: "", $regex: /.{4,}/ },
  });

  return c.html(<Top eras={distinctEras} />);
});

art.get("/:era", async (c) => {
  const era = c.req.param("era");

  const artworksForEra = await ArtPieceModel.find({
    era: { $regex: new RegExp(`^${era}$`, "i") },
  }).lean();

  return c.json(artworksForEra);
});

art.get("/:era/:title", async (c) => {
  const title = c.req.param("title");
  if (!title) {
    return c.json({ error: "title parameter is required" }, 400);
  }
  const decodedTitle = decodeURIComponent(title);

  const artworks = await ArtPieceModel.find({
    title: { $regex: new RegExp(`^${decodedTitle}$`, "i") },
  }).lean();

  return c.json(artworks);
});

export default art;
