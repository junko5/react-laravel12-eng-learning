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
import { useQuizSound } from '@/hooks/use-quiz-sound';

interface EnglishWords {
    id: number;
    word: string;
    meaning: string;
}

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

export default function Choice() {
    const [isStart, setIsStart] = useState(false);
    const { englishWords, config } = usePage().props as Props & SharedData;
    const { playCorrectSound, playWrongSound } = useQuizSound();
    // 今回のクイズセット（5問）
    const [selectedWords, setSelectedWords] = useState<EnglishWords[]>([]);
    // 現在のクイズ
    const [currentQuiz, setCurrentQuiz] = useState<EnglishWords | null>(null);

    // 選択肢（3択）
    const [Options, setOptions] = useState<string[]>([]);
    // 正解か不正解か
    const [message, setMessage] = useState<string>('');
    //　2回目の回答（初回正解かチェック）
    const [alreadyAnswered, setAlreadyAnswered] = useState<boolean>(false);
    // スコア
    const [score, setScore] = useState<number>(0);
    // 回答済み問題数
    const [quizCount, setQuizCount] = useState<number>(0);
    // 間違えた単語一覧
    const [wrongWords, setWrongWords] = useState<WrongWord[]>([]);

    const QuizStart = () => {
        setIsStart(true);
        setScore(0);
        setQuizCount(0);
        setAlreadyAnswered(false);
        setMessage("");
        setCurrentQuiz(null);
        setOptions([]);
        setWrongWords([]);

        const quizzes: EnglishWords[] = shuffle(englishWords).slice(0, config.totalQuestions);
        setSelectedWords(quizzes);
        buildQuiz(quizzes[0]);
    }

    useEffect(() => {
        QuizStart();
    }, []);


    const buildQuiz = (pick: EnglishWords): void => {
        setCurrentQuiz(pick);
        const wrongPool = englishWords.filter(eng => eng.id !== pick.id);
        const wrongs = shuffle(wrongPool).slice(0, 2);

        // 選択肢シャッフル
        const options = [pick.meaning, wrongs[0].meaning, wrongs[1].meaning]
        setOptions(shuffle(options));
    }

    const handleChoose = (choose: string): void => {
        if (currentQuiz && currentQuiz.meaning === choose) {
            setMessage("正解");
            playCorrectSound();
            if (!alreadyAnswered) {
                setScore(score + config.scoreFirstTry);
                setAlreadyAnswered(true);
            }
            setTimeout(() => {
                goNextQuiz();
            }, 1500);
        } else {
            setMessage("不正解");
            playWrongSound();
            setAlreadyAnswered(true);
            // 間違えた単語を記録
            if (currentQuiz && !wrongWords.some(w => w.word === currentQuiz.word)) {
                setWrongWords(prev => [...prev, { word: currentQuiz.word, meaning: currentQuiz.meaning }]);
            }
        }
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
        setAlreadyAnswered(false);
        setMessage("");
    }

    // 結果画面の条件
    if (isStart && quizCount >= config.totalQuestions) {
        return (
            <QuizLayout maxWidth="md" textAlign="center">
                <QuizResult 
                    score={score}
                    config={config}
                    onRestart={QuizStart}
                    quizType="choice"
                    wrongWords={wrongWords}
                />
            </QuizLayout>
        )
    }

    return (
        <QuizLayout>
            {!isStart ? (
                <div className="text-center">
                    <div className="mb-8">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center">
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

                    <QuizMessages 
                        message={message}
                        quizType="choice"
                    />

                    {/* 問題部分 */}
                    <div className="text-center mb-4">
                        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3">次の単語の意味は？</h2>
                        {currentQuiz && (
                            <div>
                                <QuizCard 
                                    content={currentQuiz.word}
                                    theme="blue"
                                />

                                <div className="grid gap-3">
                                    {Options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleChoose(option)}
                                            className={QUIZ_STYLES.buttons.choice}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </QuizLayout>
    );
}