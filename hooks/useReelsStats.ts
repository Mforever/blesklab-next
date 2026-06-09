// hooks/useReelsStats.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

interface ReelStats {
  likes: Record<string, boolean>;
  views: Record<string, number>;
}

const LIKES_KEY = 'site_reels_likes';
const VIEWS_KEY = 'site_reels_views';

export function useReelsStats() {
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [views, setViews] = useState<Record<string, number>>({});

  // Загрузка из localStorage
  useEffect(() => {
    try {
      const savedLikes = localStorage.getItem(LIKES_KEY);
      if (savedLikes) setLikes(JSON.parse(savedLikes));

      const savedViews = localStorage.getItem(VIEWS_KEY);
      if (savedViews) setViews(JSON.parse(savedViews));
    } catch {
      // ignore
    }
  }, []);

  // Лайк/анлайк
  const toggleLike = useCallback((reelId: string) => {
    setLikes((prev) => {
      const updated = { ...prev, [reelId]: !prev[reelId] };
      localStorage.setItem(LIKES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Учёт просмотра (уникальный за сессию)
  const trackView = useCallback((reelId: string) => {
    const sessionKey = `site_reel_viewed_${reelId}`;
    if (!sessionStorage.getItem(sessionKey)) {
      setViews((prev) => {
        const updated = { ...prev, [reelId]: (prev[reelId] || 0) + 1 };
        localStorage.setItem(VIEWS_KEY, JSON.stringify(updated));
        return updated;
      });
      sessionStorage.setItem(sessionKey, 'true');
    }
  }, []);

  // Получить количество лайков (базовые + пользовательские)
  const getLikes = useCallback(
    (reelId: string, baseLikes: number = 0): number => {
      return baseLikes + (likes[reelId] ? 1 : 0);
    },
    [likes]
  );

  // Получить количество просмотров (базовые + локальные)
  const getViews = useCallback(
    (reelId: string, baseViews: number = 0): number => {
      return baseViews + (views[reelId] || 0);
    },
    [views]
  );

  const isLiked = useCallback(
    (reelId: string): boolean => {
      return !!likes[reelId];
    },
    [likes]
  );

  return { toggleLike, trackView, getLikes, getViews, isLiked };
}