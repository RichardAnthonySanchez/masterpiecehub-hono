import type { FC } from "hono/jsx";
import { Layout } from "../components/Layout.js";

export const Dashboard: FC<{ eras: string[] }> = ({ eras }) => {
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
