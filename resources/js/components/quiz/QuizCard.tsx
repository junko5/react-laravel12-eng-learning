import { QUIZ_STYLES } from '@/styles/quiz';

interface QuizCardProps {
    content: string;
    theme: 'blue' | 'pink' | 'red';
}

export default function QuizCard({ content, theme }: QuizCardProps) {
    return (
        <div className={QUIZ_STYLES.cards[theme]}>
            {content}
        </div>
    );
}
