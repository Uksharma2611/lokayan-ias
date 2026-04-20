import { MetadataRoute } from 'next'
import { client } from '@/src/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.lokayan.com' // Your actual domain

  // Example: Fetch dynamic article routes from Sanity
  const articles = await client.fetch(`*[_type == "article"]{ "slug": slug.current, _updatedAt }`)
  
  const articleUrls = articles.map((article: any) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article._updatedAt),
  }))

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/courses`, lastModified: new Date() },
    { url: `${baseUrl}/faculty`, lastModified: new Date() },
    { url: `${baseUrl}/resources`, lastModified: new Date() },
    { url: `${baseUrl}/events`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/faq`, lastModified: new Date() },
    ...articleUrls,
  ]
}