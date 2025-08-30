import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import shuffle from 'lodash/shuffle';
import { QUIZ_STYLES } from '@/styles/quiz';
import QuizLayout from '@/components/quiz/QuizLayout';
import QuizHeader from '@/components/quiz/QuizHeader';
import QuizCard from '@/components/quiz/QuizCard';
import QuizMessages from '@/components/quiz/QuizMessages';
import QuizResult from '@/components/quiz/QuizResult';
import QuizHint from '@/components/quiz/QuizHint';
import { useQuizSound } from '@/hooks/use-quiz-sound';

interface EnglishWords {
    id: number;
    word: string;
    meaning: string;
}

// 型定義を追加
interface Config {
    totalQuestions: number;
    scoreFirstTry: number;
    scoreSecondTry: number;
    timerDuration: number;
}

interface Props {
    englishWords: EnglishWords[];
    config: Config;
}

interface WrongWord {
    word: string;
    meaning: string;
}

export default function InputAdvanced() {
    const { englishWords, config } = usePage().props as Props & SharedData;
    const { playCorrectSound, playWrongSound } = useQuizSound();
    
    const [isStart, setIsStart] = useState(false);
    // 今回のクイズセット（5問）
    const [selectedWords, setSelectedWords] = useState<EnglishWords[]>([]);
    // 現在のクイズ
    const [currentQuiz, setCurrentQuiz] = useState<EnglishWords | null>(null);

    // ユーザー入力
    const [userInput, setUserInput] = useState<string>('');
    // 正解か不正解か
    const [message, setMessage] = useState<string>('');
    // 間違えた回数
    const [wrongCount, setWrongCount] = useState<number>(0);
    // スコア
    const [score, setScore] = useState<number>(0);
    // 回答済み問題数
    const [quizCount, setQuizCount] = useState<number>(0);
    // タイマー関連のstate追加
    const [timeLeft, setTimeLeft] = useState<number>(config.timerDuration);
    const [isTimeout, setIsTimeout] = useState<boolean>(false);
    const [timerActive, setTimerActive] = useState<boolean>(false);
    // 間違えた単語一覧
    const [wrongWords, setWrongWords] = useState<WrongWord[]>([]);

    const QuizStart = () => {
        setIsStart(true);
        setCurrentQuiz(null);
        setMessage("");

        setScore(0);
        setQuizCount(0);
        setUserInput('');
        setWrongCount(0);
        setWrongWords([]);

        const quizzes: EnglishWords[] = shuffle(englishWords).slice(0, config.totalQuestions);
        setSelectedWords(quizzes);
        buildQuiz(quizzes[0]);
    }

    useEffect(() => {
        QuizStart();
    }, []);

    useEffect(() => {
        if (timerActive && timeLeft > 0 && !isTimeout && message !== "正解") {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && timerActive) {
            setIsTimeout(true);
            setMessage("時間切れ");
            setTimerActive(false);
            playWrongSound();
            // 時間切れの場合に記録
            if (currentQuiz && !wrongWords.some(w => w.word === currentQuiz.word)) {
                setWrongWords(prev => [...prev, { word: currentQuiz.word, meaning: currentQuiz.meaning }]);
            }
        }
    }, [timeLeft, timerActive, isTimeout, message]);

    // Enterキーで「次の問題へ」に対応
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && message === "時間切れ") {
                event.preventDefault();
                handleNextQuestion();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [message]); // messageが変わった時に再設定


    const buildQuiz = (pick: EnglishWords): void => {
        setCurrentQuiz(pick);
        setUserInput('');
        setMessage('');
        setWrongCount(0);
        // タイマーリセット
        setTimeLeft(config.timerDuration);
        setIsTimeout(false);
        setTimerActive(true);
    }

    const handleChoose = (input: string): void => {
        if (!input || input === "" || message === "正解" || message === "時間切れ") return;
        if (!currentQuiz?.word) return;

        const userAnswer = input.trim().toLowerCase();
        const correctAnswer = currentQuiz.word.toLowerCase();

        if (userAnswer === correctAnswer) {
            setMessage("正解");
            setTimerActive(false);
            playCorrectSound(); // タイマー停止
            // 初回で正解した場合
            if (wrongCount === 0) {
                setScore(score + config.scoreFirstTry); 
            } else if (wrongCount === 1) {
                setScore(score + config.scoreSecondTry); 
            }
            setUserInput('');
            setTimeout(() => {
                goNextQuiz();
            }, 1200);
        } else {
            const newWrongCount = wrongCount + 1;
            setWrongCount(newWrongCount);
            playWrongSound();
            
            setMessage("不正解");
        }
    }

    const handleNextQuestion = (): void => {
        setUserInput('');
        goNextQuiz();
    }

    const goNextQuiz = (): void => {
        const newQuizCount = quizCount + 1;
        if (newQuizCount >= config.totalQuestions) { 
            setQuizCount(newQuizCount);
            return;
        }
        const nextQuiz = selectedWords[newQuizCount];
        buildQuiz(nextQuiz);
        setQuizCount(newQuizCount);
        setWrongCount(0);
        setMessage("");
    }

    // 結果画面の場合
    if (isStart && quizCount >= config.totalQuestions) {
        return (
            <QuizLayout maxWidth="md" textAlign="center">
                <QuizResult 
                    score={score}
                    config={config}
                    onRestart={QuizStart}
                    quizType="input_advanced"
                    wrongWords={wrongWords}
                />
            </QuizLayout>
        )
    }

    // メイン画面の場合
    return (
        <QuizLayout>
            {!isStart ? (
                <div className="text-center">
                    <div className="mb-8">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <span className="text-4xl">📚</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">くまたと英単語</h1>
                        <p className="text-gray-600 text-lg">{config.totalQuestions}問の英単語クイズに挑戦しよう！</p>
                    </div>
                    <button
                        onClick={() => QuizStart()}
                        className={QUIZ_STYLES.buttons.primary}
                    >
                        スタート
                    </button>
                </div>
            ) : (
                <div>
                    <QuizHeader 
                        questionNumber={quizCount + 1}
                        totalQuestions={config.totalQuestions}
                        score={score}
                    />

                    {/* タイマープログレスバー */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">残り時間</span>
                            <span className={`text-lg font-bold ${
                                timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-blue-600'
                            }`}>
                                {timeLeft}秒
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                                className={`h-3 rounded-full transition-all duration-1000 ${
                                    timeLeft <= 3 ? 'bg-red-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${(timeLeft / config.timerDuration) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* メッセージはヒント部分に統合済み */}

                    {/* 問題部分 */}
                    <div className="text-center mb-4">
                        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                            {config.timerDuration}秒以内に英語で回答
                        </h2>
                        {currentQuiz && (
                            <div>
                                <QuizCard 
                                    content={currentQuiz.meaning}
                                    theme="red"
                                />

                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleChoose(userInput);
                                }}>

                                    <div className="grid gap-3">
                                        <QuizHint 
                                            wrongCount={wrongCount}
                                            currentWord={currentQuiz?.word || ''}
                                            message={message}
                                            currentQuiz={currentQuiz}
                                            quizType="input_advanced"
                                        />
                                        
                                        {/* 時間切れの時のみ「次の問題へ」ボタンを表示 */}
                                        {message === "時間切れ" ? (
                                            <button
                                                onClick={handleNextQuestion}
                                                className={QUIZ_STYLES.buttons.secondary}
                                            >
                                                次の問題へ →
                                            </button>
                                        ) : (
                                            <>
                                                <input
                                                    type="text"
                                                    value={userInput}
                                                    autoFocus
                                                    onChange={(e) => setUserInput(e.target.value)}
                                                    className="w-full p-4 border border-gray-300 rounded-xl text-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    maxLength={20}
                                                />
                                                <button
                                                    type="submit"
                                                    className={QUIZ_STYLES.buttons.primary}
                                                >
                                                    回答
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </QuizLayout>
    );
}