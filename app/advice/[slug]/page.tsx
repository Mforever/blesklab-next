// app/advice/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticleBySlug } from '@/lib/mdx';
import Link from 'next/link';
import { marked } from 'marked';
import ArticleRating from '@/components/ui/ArticleRating';

const CATEGORY_LABELS: Record<string, string> = {
  ceramic: 'Керамика',
  polish: 'Полировка',
  ppf: 'Бронирование',
  headlights: 'Фары',
  general: 'Общие советы',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Статья не найдена' };
  }

  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: `${article.meta.title} | Лаборатория блеска`,
      description: article.meta.description,
      type: 'article',
      publishedTime: article.meta.date,
      authors: [article.meta.author],
      images: [{ url: article.meta.image, width: 1200, height: 675 }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const htmlContent = marked.parse(article.content);

  return (
    <div className="min-h-screen bg-bg-primary pt-24 sm:pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        <nav className="text-sm text-text-secondary/60 mb-6" aria-label="Хлебные крошки">
          <Link href="/advice" className="hover:text-accent transition-colors">
            Советы экспертов
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text-secondary">{article.meta.title}</span>
        </nav>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-accent/20 text-accent text-xs px-3 py-1 rounded-full">
              {CATEGORY_LABELS[article.meta.category] || article.meta.category}
            </span>
            <span className="text-text-secondary/40 text-xs">{article.meta.date}</span>
            <span className="text-text-secondary/40 text-xs flex items-center gap-1">
              ⏱ {article.meta.readTime} мин чтения
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            {article.meta.title}
          </h1>
          <p className="text-text-secondary text-base sm:text-lg">{article.meta.description}</p>
        </div>

        {article.meta.image && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={article.meta.image}
              alt={article.meta.title}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        )}

        {article.meta.video && (
          <div className="mb-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                src={`${article.meta.video}&autoplay=0&loop=1&rel=0&showinfo=0`}
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                frameBorder="0"
                allowFullScreen
                title={article.meta.title}
              />
            </div>
          </div>
        )}

        <div
          className="advice-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Оценка статьи + CTA */}
        <ArticleRating slug={slug} />
      </div>
    </div>
  );
}