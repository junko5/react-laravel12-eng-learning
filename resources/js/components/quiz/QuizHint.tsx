import { QUIZ_STYLES } from '@/styles/quiz';

interface QuizHintProps {
    wrongCount: number;
    currentWord: string;
    message?: string;
    currentQuiz?: { word: string };
    quizType?: 'choice' | 'input' | 'input_advanced';
}

export default function QuizHint({ 
    wrongCount, 
    currentWord, 
    message = '', 
    currentQuiz,
    quizType = 'input'
}: QuizHintProps) {
    const getHintText = () => {
        const wordLength = currentWord.length;
        if (wrongCount === 0) {
            const firstLetter = currentWord.charAt(0);
            return (
                <>ヒント：最初の文字は「{firstLetter}」、{wordLength}文字です。</>
            );
        } else {
            const firstTwoLetters = currentWord.substring(0, 2);
            return (
                <>ヒント：最初の<span className="text-red-600 font-bold">2文字</span>は「<span className="text-red-600 font-bold">{firstTwoLetters}</span>」、{wordLength}文字です。</>
            );
        }
    };

    return (
        <div className={QUIZ_STYLES.hints.container}>
            {/* ヒント部分 */}
            <div className={QUIZ_STYLES.hints.box}>
                <span className={QUIZ_STYLES.hints.icon}>💡</span>
                <span className={QUIZ_STYLES.hints.text}>
                    {getHintText()}
                </span>
            </div>

            {/* メッセージ部分 */}
            {message && (
                <div className={`${QUIZ_STYLES.hints.messageBox} ${
                    message === "正解" 
                        ? "bg-red-100 border-red-300 text-red-800" 
                        : message === "時間切れ"
                        ? "bg-yellow-100 border-yellow-300 text-yellow-800"
                        : "bg-gray-100 border-gray-300 text-gray-800 animate-pulse"
                } border-2`}>
                    <span className={QUIZ_STYLES.hints.messageText}>
                        {message === "正解" && "🎉 正解です！"}
                        {message === "不正解" && (
                            quizType === 'input_advanced' 
                                ? "❌ 不正解です！制限時間内にもう一度！"
                                : "❌ もう一度チャレンジしてね。"
                        )}
                        {message === "不正解2回目" && `❌ 正解は「${currentQuiz?.word}」でした。`}
                        {message === "時間切れ" && `⏰ 時間切れ！正解は「${currentQuiz?.word}」でした。`}
                    </span>
                </div>
            )}
        </div>
    );
}