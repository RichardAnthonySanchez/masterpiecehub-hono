import type { FC } from "hono/jsx";
import { Layout } from "../components/Layout.js";

export const Era: FC<{ artworks: string[]; era: string }> = ({
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
        <h1>{capitalizedEra}</h1>
        <ul className="xl:grid xl:grid-cols-5 xl:gap-4">
          {artworks.map((art: string) => (
            <li
              className="era-item my-8 text-4xl xl:text-xl p-10 rounded-2xl"
              key={art}
            >
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
      </div>
    </Layout>
  );
};
