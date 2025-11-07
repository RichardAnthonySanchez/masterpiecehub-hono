import type { FC } from "hono/jsx";
import { Layout } from "../components/Layout.js";

export const Era: FC<{ artworks: string[]; era: string }> = ({
  artworks,
  era,
}) => {
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
