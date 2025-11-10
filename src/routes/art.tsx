import { Hono } from "hono";
import { ArtPieceModel } from "../models/Art.js";
import { Dashboard } from "../components/Dashboard.js";
import { Era } from "../components/Era.js";
import { Artwork } from "../components/Artwork.js";

const art = new Hono();

art.get("/", async (c) => {
  const distinctEras = await ArtPieceModel.distinct("era", {
    era: { $exists: true, $ne: "", $regex: /.{4,}/ },
  });

  const firstArtwork = await ArtPieceModel.aggregate([
    { $group: { _id: "$era", artwork: { $first: "$$ROOT" } } },
    { $replaceRoot: { newRoot: "$artwork" } },
  ]);

  return c.html(<Dashboard artworks={firstArtwork} eras={distinctEras} />);
});

art.get("/:era", async (c) => {
  const era = c.req.param("era");

  const artworksForEra = await ArtPieceModel.find({
    era: { $regex: new RegExp(`^${era}$`, "i") },
  }).lean();

  return c.html(<Era artworks={artworksForEra} era={era} />);
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
