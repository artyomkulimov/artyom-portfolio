import type { APIRoute } from 'astro';

const baseUrl = 'https://artyom-kulimov-portfolio.vercel.app';
const routes = ['/', '/showcase/taptm', '/showcase/study-lens'];

export const GET: APIRoute = () => {
  const lastModified = new Date().toISOString().split('T')[0];
  const urls = routes
    .map((route) => {
      const url = new URL(route, baseUrl).toString();
      return `<url><loc>${url}</loc><lastmod>${lastModified}</lastmod></url>`;
    })
    .join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
