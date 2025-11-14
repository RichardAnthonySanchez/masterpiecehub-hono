import type { FC } from "hono/jsx";

export const Layout: FC = (props) => {
  return (
    <html>
      <link href="/styles/output.css" rel="stylesheet" />
      <body className="p-8">{props.children}</body>
      <script src="/js/img-wrap.js"></script>
    </html>
  );
};
