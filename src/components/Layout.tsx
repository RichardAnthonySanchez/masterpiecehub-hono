import type { FC } from "hono/jsx";

export const Layout: FC = (props) => {
  return (
    <html>
      <link href="/styles/output.css" rel="stylesheet" />
      <body className="p-8 lg:px-96">{props.children}</body>
    </html>
  );
};
