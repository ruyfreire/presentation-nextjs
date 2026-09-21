import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/utils/site-url'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()

  return [
    {
      url: siteUrl,
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/about`,
      priority: 0.7,
      lastModified: new Date(),
    },
  ]
}
