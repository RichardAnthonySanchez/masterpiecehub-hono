import type { FC } from "hono/jsx";

export const Layout: FC = (props) => {
  return (
    <html>
      <link href="/styles/output.css" rel="stylesheet" />
      <body>{props.children}</body>
    </html>
  );
};
