import type { FC } from "hono/jsx";
import { Layout } from "../components/Layout.js";
import type { ArtPiece } from "../models/Art.js";

export const Artwork: FC<ArtPiece> = ({
  title,
  artist,
  description,
  image,
  era,
}) => {
  return (
    <Layout>
      <div className="artwork-container xl:px-72">
        <div className="heading display-flex flex-col gap-4 items-center mb-8 text-center">
          <h1 className="text-6xl font-bold my-6">{title}</h1>
          <p>{artist}</p>
        </div>
        <div className="col">
          <div className="artwork flex justify-center mb-8">
            <img className="" src={"/" + image} alt={title} decoding="async" />
          </div>
          <p className="era-copy sm:text-5xl xl:text-2xl/10">{description}</p>
        </div>
      </div>
      <div className="footer-nav flex justify-center mt-12">
        <a
          href={`/art/` + era.toLowerCase()}
          className="btn btn-primary text-4xl w-full"
        >
          Select A Different Artwork from: {era}
        </a>
      </div>
    </Layout>
  );
};
