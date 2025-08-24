import { QUIZ_STYLES } from '@/styles/quiz';

interface QuizMessagesProps {
    message: string;
    currentQuiz?: { word: string };
    quizType: 'choice' | 'input' | 'input_advanced';
}

export default function QuizMessages({ message, currentQuiz, quizType }: QuizMessagesProps) {
    return (
        <div className="mb-4 min-h-[40px] flex items-center justify-center">
            {message === "正解" && (
                <div className={QUIZ_STYLES.messages.correct}>
                    <span className="font-bold text-lg">🎉 正解です！</span>
                </div>
            )}
            {message === "不正解" && (
                <div className={QUIZ_STYLES.messages.incorrect}>
                    <span className="font-bold text-lg">
                        {quizType === 'choice' 
                            ? "❌もう一度チャレンジしてね。" 
                            : quizType === 'input_advanced'
                            ? "❌ 不正解です！制限時間内にもう一度！"
                            : "❌ もう一度チャレンジしてね。"
                        }
                    </span>
                </div>
            )}
            {message === "不正解2回目" && quizType === 'input' && (
                <div className={QUIZ_STYLES.messages.incorrect}>
                    <span className="font-bold text-lg">❌ 正解は{currentQuiz?.word}でした。</span>
                </div>
            )}
            {message === "時間切れ" && quizType === 'input_advanced' && (
                <div className={QUIZ_STYLES.messages.timeout}>
                    <span className="font-bold text-lg">⏰ 時間切れ！正解は「{currentQuiz?.word}」でした。</span>
                </div>
            )}
        </div>
    );
}
