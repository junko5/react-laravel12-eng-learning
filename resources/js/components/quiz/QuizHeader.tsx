import { QUIZ_STYLES } from '@/styles/quiz';

interface QuizHeaderProps {
    questionNumber: number;
    totalQuestions: number;
    score: number;
}

export default function QuizHeader({ questionNumber, totalQuestions, score }: QuizHeaderProps) {
    return (
        <div className={QUIZ_STYLES.layout.header}>
            <div className={QUIZ_STYLES.badges.question}>
                <span className={QUIZ_STYLES.badges.questionText}>
                    問題 {questionNumber}/{totalQuestions}
                </span>
            </div>
            <div className={QUIZ_STYLES.badges.score}>
                <span className={QUIZ_STYLES.badges.scoreText}>
                    スコア: {score}
                </span>
            </div>
        </div>
    );
}
