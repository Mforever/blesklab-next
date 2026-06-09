// app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center">
        {/* Скелетон логотипа */}
        <div className="w-12 h-12 bg-accent rounded-lg rotate-45 mx-auto mb-8 animate-pulse" />

        {/* Скелетоны строк */}
        <div className="space-y-4 max-w-md mx-auto">
          <div className="h-4 bg-bg-element rounded-full w-3/4 mx-auto animate-pulse" />
          <div className="h-4 bg-bg-element rounded-full w-1/2 mx-auto animate-pulse" />
          <div className="h-4 bg-bg-element rounded-full w-2/3 mx-auto animate-pulse" />
        </div>

        <p className="text-text-secondary/50 text-sm mt-8 animate-pulse">
          Загрузка...
        </p>
      </div>
    </div>
  );
}