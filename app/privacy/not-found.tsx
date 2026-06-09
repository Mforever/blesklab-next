// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl font-bold text-accent/20 mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Страница не найдена</h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Возможно, вы перешли по старой ссылке или страница была перемещена.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all font-medium"
          >
            На главную
          </Link>
          <Link
            href="/contacts"
            className="px-6 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-xl transition-all font-medium"
          >
            Контакты
          </Link>
        </div>
      </div>
    </div>
  );
}