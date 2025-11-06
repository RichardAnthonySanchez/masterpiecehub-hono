import { Hono } from "hono";
import { ArtPieceModel } from "../models/Art.js";
import type { FC } from "hono/jsx";

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
};

const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
  return (
    <Layout>
      <h1>Artworks</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}</li>;
        })}
      </ul>
    </Layout>
  );
};

const art = new Hono();

art.get("/", async (c) => {
  const arts = await ArtPieceModel.find({}).lean();

  const first = arts[0];
  const artsArray = Array.isArray(first) ? first : Object.values(first);

  const artsAsStrings = artsArray.map((art) => art.title);

  return c.html(<Top messages={artsAsStrings} />);
});

export default art;
