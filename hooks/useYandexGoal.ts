// hooks/useYandexGoal.ts
'use client';

import { useCallback } from 'react';

declare global {
  interface Window {
    ym: (counterId: number, action: string, goalName: string, params?: Record<string, any>) => void;
  }
}

export const useYandexGoal = () => {
  const counterId = 108982663;

  const sendGoal = useCallback((goalName: string, params?: Record<string, any>) => {
    if (!counterId) {
      console.warn('Yandex Metrika: ID not set');
      return;
    }

    try {
      if (typeof window !== 'undefined' && window.ym) {
        window.ym(counterId, 'reachGoal', goalName, params);
        console.log(`Yandex Goal sent: ${goalName}`, params);
      } else {
        console.warn('Yandex Metrika: ym function not available yet');
      }
    } catch (error) {
      console.error('Yandex Goal error:', error);
    }
  }, []);

  return { sendGoal };
};