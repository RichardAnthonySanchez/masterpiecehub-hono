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

const Era: FC<{ artworks: string[]; era: string }> = ({ artworks, era }) => {
  return (
    <Layout>
      <h1>{era}</h1>
      <ul>
        {artworks.map((art: string) => (
          <li key={art}>
            <a
              href={`/art/${encodeURIComponent(
                era.toLowerCase()
              )}/${encodeURIComponent(art.toLowerCase())}`}
            >
              {art}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

const Artwork: FC<ArtPiece> = ({ title, artist, description }) => {
  return (
    <Layout>
      <h1>{title}</h1>
      <p>
        <strong>Artist:</strong> {artist}
      </p>
      <p>{description}</p>
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

  const artworkTitles = artworksForEra.map((art) =>
    typeof art.title === "string" && art.title.trim() ? art.title : "Untitled"
  );

  return c.html(<Era artworks={artworkTitles} era={era} />);
});

art.get("/:era/:title", async (c) => {
  const title = c.req.param("title");
  if (!title) {
    return c.json({ error: "title parameter is required" }, 400);
  }
  const decodedTitle = decodeURIComponent(title);

  const arts = await ArtPieceModel.find({
    title: { $regex: new RegExp(`^${decodedTitle}$`, "i") },
  }).lean();

  if (!arts.length) {
    return c.html(<div>Artwork not found</div>);
  }

  const art = arts[0];

  return c.html(
    <Artwork
      id={art.id}
      era={art.era}
      title={art.title}
      artist={art.artist}
      description={art.description}
      year={art.year}
      image={art.image}
    />
  );
});

export default art;
