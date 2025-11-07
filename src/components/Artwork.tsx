import type { FC } from "hono/jsx";
import { Layout } from "../components/Layout.js";
import type { ArtPiece } from "../models/Art.js";

export const Artwork: FC<ArtPiece> = ({ title, artist, description }) => {
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
