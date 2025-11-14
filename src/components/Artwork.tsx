import type { FC } from "hono/jsx";
import { Layout } from "../components/Layout.js";
import type { ArtPiece } from "../models/Art.js";

export const Artwork: FC<ArtPiece> = ({
  title,
  artist,
  description,
  image,
}) => {
  return (
    <Layout>
      <div className="artwork-container xl:px-72">
        <div className="heading display-flex flex-col gap-4 items-center mb-8 text-center">
          <h1 className="text-6xl font-bold my-6">{title}</h1>
          <p>{artist}</p>
        </div>
        <div className="col">
          <div className="artwork mb-8">
            <img className="" src={"/" + image} alt={title} decoding="async" />
          </div>
          <p className="era-copy lg:text-2xl/10">{description}</p>
        </div>
      </div>
    </Layout>
  );
};
