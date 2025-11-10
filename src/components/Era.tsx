import type { FC } from "hono/jsx";
import { Layout } from "../components/Layout.js";
import { ArtPiece } from "../models/Art.js";

export const Era: FC<{ artworks: ArtPiece[]; era: string }> = ({
  artworks,
  era,
}) => {
  const capitalizedEra = era
    .split(/\s|-/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Layout>
      <div className="era-container flex flex-col gap-4 items-center">
        <h1 class="text-9xl xl:text-8xl">{capitalizedEra}</h1>
        <ul className="xl:grid xl:grid-cols-5 xl:gap-4">
          {artworks.map((art: ArtPiece) => (
            <li
              key={art.title}
              className="era-item my-8 text-4xl xl:text-xl rounded-2xl overflow-clip xl:p-0"
            >
              <a
                href={`/art/${encodeURIComponent(
                  era.toLowerCase()
                )}/${encodeURIComponent(art.title.toLowerCase())}`}
                className="block w-full h-full"
              >
                <div className="flex flex-col items-center">
                  <div className="w-full h-80 rounded-2xl overflow-clip ">
                    <img
                      src={"/" + art.image}
                      alt={art.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <h2 className="my-4 text-7xl xl:text-lg">{art.title}</h2>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};
