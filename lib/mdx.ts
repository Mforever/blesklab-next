// lib/mdx.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  author: string;
  image: string;
  video?: string;
}

export interface ArticleData {
  meta: ArticleMeta;
  content: string;
}

const articlesDirectory = path.join(process.cwd(), 'data/articles');

// Кеш для скомпилированных статей
const articleCache = new Map<string, ArticleData>();

export function getArticleBySlug(slug: string): ArticleData | null {
  // Проверяем кеш
  if (articleCache.has(slug)) {
    return articleCache.get(slug)!;
  }

  try {
    const fullPath = path.join(articlesDirectory, slug, 'index.mdx');
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const article: ArticleData = {
      meta: {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        readTime: data.readTime,
        category: data.category,
        author: data.author,
        image: data.image,
        video: data.video || undefined,
      },
      content,
    };

    // Кешируем
    articleCache.set(slug, article);
    return article;
  } catch {
    return null;
  }
}

export function getAllArticles(): ArticleMeta[] {
  try {
    if (!fs.existsSync(articlesDirectory)) return [];

    const slugs = fs.readdirSync(articlesDirectory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    const articles = slugs
      .map((slug) => {
        const article = getArticleBySlug(slug);
        return article?.meta;
      })
      .filter(Boolean) as ArticleMeta[];

    return articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}