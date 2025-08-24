import { useCallback } from 'react';
import type { GameStats, DailyStats } from '@/types';

export const useQuizSession = () => {
    /**
     * ゲーム結果を記録
     */
    const recordGameResult = useCallback(async (gameType: string, score: number) => {
        try {
            const response = await fetch('/api/record-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    gameType,
                    score,
                }),
            });

            if (!response.ok) {
                console.error('Failed to record game result');
            }
        } catch (error) {
            console.error('Error recording game result:', error);
        }
    }, []);

    /**
     * セッション統計を取得
     */
    const getSessionStats = useCallback(async (gameType?: string): Promise<{
        stats: GameStats;
        dailyStats: DailyStats[];
    } | null> => {
        try {
            const url = gameType ? `/api/session-stats?gameType=${gameType}` : '/api/session-stats';
            const response = await fetch(url);
            
            if (!response.ok) {
                console.error('Failed to fetch session stats');
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching session stats:', error);
            return null;
        }
    }, []);

    return {
        recordGameResult,
        getSessionStats,
    };
};
