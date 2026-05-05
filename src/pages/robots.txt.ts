import type { APIRoute } from 'astro';

const baseUrl = 'https://artyom-kulimov-portfolio.vercel.app';

export const GET: APIRoute = () => {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
