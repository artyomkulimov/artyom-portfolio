export const baseUrl = 'https://artyom-kulimov-portfolio.vercel.app'

export default async function sitemap() {
  let routes = ['', '/showcase/taptm', '/showcase/study-lens'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return routes
}
