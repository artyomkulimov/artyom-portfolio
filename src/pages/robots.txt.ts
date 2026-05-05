import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const site = import.meta.env.SITE;

  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
};
