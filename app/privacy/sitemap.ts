// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blesklab.ru';

  const staticPages = [
    { path: '', priority: 1.0, changeFreq: 'weekly' as const },
    { path: '/polish', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/ceramic', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/ppf', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/gallery', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/advice', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/contacts', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
  ];

  const articles = [
    'why-polish-before-ceramic',
    'ceramic-vs-wax',
    'ppf-full-vs-partial',
    'how-to-check-polish-quality',
  ];

  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));

  const articleEntries = articles.map((slug) => ({
    url: `${baseUrl}/advice/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}