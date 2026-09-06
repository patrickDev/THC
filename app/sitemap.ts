import type { MetadataRoute } from 'next';
import { getDb } from '@/db/index';
import { properties } from '@/db/schema';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://texashomescapital.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProperties = await (await getDb())
    .select({ slug: properties.slug, createdAt: properties.createdAt })
    .from(properties);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/buyers`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/sellers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/partnership`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = allProperties.map((p) => ({
    url: `${BASE_URL}/buyers/${p.slug}`,
    lastModified: p.createdAt ?? new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
