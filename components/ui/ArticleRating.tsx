// components/ui/ArticleRating.tsx
'use client';

import { useState, useEffect } from 'react';

interface ArticleRatingProps {
  slug: string;
}

export default function ArticleRating({ slug }: ArticleRatingProps) {
  const [rating, setRating] = useState<'up' | 'down' | null>(null);
  const [votes, setVotes] = useState({ up: 0, down: 0 });

  useEffect(() => {
    const saved = localStorage.getItem(`article_rating_${slug}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setRating(data.userVote);
        setVotes(data.votes);
      } catch {
        // ignore
      }
    } else {
      setVotes({
        up: Math.floor(Math.random() * 20) + 5,
        down: Math.floor(Math.random() * 5),
      });
    }
  }, [slug]);

  const handleVote = (type: 'up' | 'down') => {
    if (rating === type) return;

    const newVotes = { ...votes };

    if (rating === 'up') newVotes.up--;
    if (rating === 'down') newVotes.down--;

    if (type === 'up') newVotes.up++;
    if (type === 'down') newVotes.down++;

    setRating(type);
    setVotes(newVotes);
    localStorage.setItem(
      `article_rating_${slug}`,
      JSON.stringify({ userVote: type, votes: newVotes })
    );
  };

  const total = votes.up + votes.down;
  const percent = total > 0 ? Math.round((votes.up / total) * 100) : 0;

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <div className="text-center">
        <p className="text-text-secondary text-sm mb-3">Была ли статья полезна?</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleVote('up')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm border ${rating === 'up'
                ? 'bg-accent/20 border-accent text-accent'
                : 'bg-bg-element border-white/5 text-text-secondary hover:bg-accent/10 hover:text-accent'
              }`}
          >
            <span className="text-base">👍</span>
            <span>Да ({votes.up})</span>
          </button>
          <button
            onClick={() => handleVote('down')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm border ${rating === 'down'
                ? 'bg-red-500/20 border-red-500 text-red-400'
                : 'bg-bg-element border-white/5 text-text-secondary hover:bg-red-500/10 hover:text-red-400'
              }`}
          >
            <span className="text-base">👎</span>
            <span>Нет ({votes.down})</span>
          </button>
        </div>

        {total > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-secondary/60">
            <div className="flex items-center gap-1">
              <div className="w-16 h-1.5 bg-bg-element rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span>{percent}% полезности</span>
            </div>
            <span>·</span>
            <span>{total} оценок</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <p className="text-text-secondary text-sm mb-4">
          Остались вопросы? Напишите нам — ответим в течение 15 минут
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://t.me/rudenko_ds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all font-medium"
          >
            Написать в Telegram
          </a>
          <a
            href="/contacts"
            className="px-6 py-2 border-2 border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-xl transition-all font-medium"
          >
            Контакты
          </a>
        </div>
      </div>
    </div>
  );
}