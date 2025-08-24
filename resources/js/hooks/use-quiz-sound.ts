import { useCallback } from 'react';

export const useQuizSound = () => {
    const playSound = useCallback((soundType: 'correct' | 'wrong') => {
        try {
            const audio = new Audio(`/sound/${soundType}.mp3`);
            audio.volume = 0.5;
            audio.play().catch((error) => {
                console.log('Sound play failed:', error);
            });
        } catch (error) {
            console.log('Sound initialization failed:', error);
        }
    }, []);

    const playCorrectSound = useCallback(() => playSound('correct'), [playSound]);
    const playWrongSound = useCallback(() => playSound('wrong'), [playSound]);

    return {
        playCorrectSound,
        playWrongSound,
        playSound
    };
};
