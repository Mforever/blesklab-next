// components/home/VideoReels.tsx
import ReelsDrum from '@/components/ui/ReelsDrum';
import type { Reel } from '@/components/ui/ReelsDrum';
import reelsData from '@/data/reels.json';

const reels = reelsData as Reel[];

export default function VideoReels() {
  return (
    <section className="py-20 bg-bg-primary overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-10">
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
            Короткие видео
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Это интересно</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Быстрые ответы на частые вопросы и демонстрация наших работ
          </p>
        </div>

        <ReelsDrum reels={reels} showStats showServiceBadge autoPlay />
      </div>
    </section>
  );
}