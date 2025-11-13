import type { FC } from "hono/jsx";
import { Layout } from "../components/Layout.js";
import { ArtPiece } from "../models/Art.js";

export const Dashboard: FC<{ artworks: ArtPiece[]; eras: string[] }> = ({
  artworks,
  eras,
}) => {
  const sortedArtworks = [...artworks].sort(
    (a: any, b: any) => a.year - b.year
  );

  const sortedEras = Array.from(new Set(sortedArtworks.map((art) => art.era)));

  return (
    <Layout>
      <div className="dashboard-container flex flex-col gap-4 items-center">
        <h1 className="text-9xl xl:text-8xl">Art Movements</h1>
        <ul className="xl:grid xl:grid-cols-5 xl:gap-4 w-full">
          {sortedEras.map((era) => {
            const artpiece = sortedArtworks.find((art) => art.era === era);
            if (!artpiece) return null;

            return (
              <li
                className="dashboard-item my-8 text-4xl xl:text-xl rounded-2xl overflow-clip xl:p-0"
                key={era}
              >
                <a
                  href={`/art/${encodeURIComponent(era.toLowerCase())}`}
                  className="block w-full h-full"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-full h-80 rounded-2xl overflow-clip">
                      <img
                        src={`/${artpiece.image}`}
                        alt={artpiece.title}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <h2 className="my-4 text-7xl xl:text-lg">{era}</h2>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};
