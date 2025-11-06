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
  const arts = await ArtPieceModel.find({}).lean();

  const first = arts[0];
  const artsArray = Array.isArray(first) ? first : Object.values(first);

  const allEras = artsArray.map((art) => art.era);

  const distinctEras = Array.from(new Set(allEras)).filter(
    (era) => era && era.length >= 4
  );

  return c.html(<Top eras={distinctEras} />);
});

art.get("/:era", async (c) => {
  const era = c.req.param("era");

  const arts = await ArtPieceModel.find({}).lean();
  const first = arts[0];
  const artsArray = Array.isArray(first) ? first : Object.values(first);

  const artworksForEra = artsArray.filter(
    (art: ArtPiece) => art.era && art.era.toLowerCase() === era.toLowerCase()
  );

  return c.json(artworksForEra);
});

export default art;
