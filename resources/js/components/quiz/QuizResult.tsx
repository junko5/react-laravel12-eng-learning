import { useState, useEffect } from 'react';
import { QUIZ_STYLES } from '@/styles/quiz';
import { useQuizSession } from '@/hooks/use-quiz-session';
import type { GameStats, DailyStats } from '@/types';

interface Config {
    totalQuestions: number;
    scoreFirstTry: number;
    scoreSecondTry: number;
}

interface WrongWord {
    word: string;
    meaning: string;
}

interface QuizResultProps {
    score: number;
    config: Config;
    onRestart: () => void;
    quizType: 'choice' | 'input' | 'input_advanced';
    wrongWords?: WrongWord[];
}

export default function QuizResult({ score, config, onRestart, quizType, wrongWords = [] }: QuizResultProps) {
    const { recordGameResult, getSessionStats } = useQuizSession();
    const [sessionStats, setSessionStats] = useState<{
        stats: GameStats;
        dailyStats: DailyStats[];
    } | null>(null);

    // 最大スコアの計算
    const maxScore = config.totalQuestions * config.scoreFirstTry;

    // コンポーネントマウント時にゲーム結果を記録し、統計を取得
    useEffect(() => {
        const handleGameEnd = async () => {
            // ゲーム結果を記録
            await recordGameResult(quizType, score);
            
            // このゲームタイプの統計を再取得
            const stats = await getSessionStats(quizType);
            if (stats) {
                setSessionStats(stats);
            }
        };

        handleGameEnd();
    }, [recordGameResult, getSessionStats, quizType, score]);

    // スコア説明文
    const scoreDescription = quizType === 'choice'
        ? null // 三択は説明なし
        : `*一度で正解だと${config.scoreFirstTry}点、2回目で正解だと${config.scoreSecondTry}点が加点されます。`;

    // くまたのコメントとキャラクター決定
    const getKumataComment = (score: number) => {
        if (score <= 2) {
            return {
                comment: "まだまだこれから！",
                character: "/img/kumata.png" // 通常のくまた
            };
        } else if (score <= 6) {
            return {
                comment: "がんばったね！",
                character: "/img/kumata.png" // 通常のくまた
            };
        } else {
            return {
                comment: "すごい！",
                character: "/img/kumata.png" // 本来はhappy_kumataだが、今は通常版を使用
            };
        }
    };

    const kumataResult = getKumataComment(score);

    return (
        <div className="mb-6">
            {/* くまたキャラクター */}
            <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <img 
                    src={kumataResult.character} 
                    alt="くまた" 
                    className="w-full h-full object-contain"
                />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">クイズ終了！</h1>
            
            {/* くまたのコメント */}
            <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 mb-4 relative">
                <div className="text-lg font-bold text-gray-800">
                    {kumataResult.comment}
                </div>
                {/* 吹き出しの三角形 */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-yellow-300"></div>
            </div>
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                {score}/{maxScore}
            </div>
            <p className="text-gray-600">あなたのスコアです</p>
            {scoreDescription && (
                <p className="text-gray-600 text-sm">{scoreDescription}</p>
            )}
            
            {/* 間違えた単語一覧 */}
            {wrongWords.length > 0 && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center">
                        <span className="mr-2">⭐</span>
                        今回間違えた単語
                        <span className="ml-2">⭐</span>
                    </h3>
                    <div className="space-y-2">
                        {wrongWords.map((wrongWord, index) => (
                            <div key={index} className="bg-white p-3 rounded border-l-4 border-red-400">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-red-700">{wrongWord.word}</span>
                                    <span className="text-gray-600">{wrongWord.meaning}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* 今回の統計表示 */}
            {sessionStats && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-800 mb-3">おつかれさまです</h3>
                    <p className="text-gray-700 text-sm mb-3">
                        今日はこのゲームを<span className="font-bold text-blue-600">{sessionStats.stats.todayCount}</span>回チャレンジしました。
                        今回の得点は<span className="font-bold text-blue-600">{score}</span>点です。
                    </p>
                    
                    {/* 日別記録表 */}
                    {sessionStats.dailyStats && sessionStats.dailyStats.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-md font-bold text-gray-800 mb-2">このゲームの記録</h4>
                            <div className="bg-white rounded border overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-3 py-2 text-left">日付</th>
                                            <th className="px-3 py-2 text-center">回数</th>
                                            <th className="px-3 py-2 text-center">最高得点</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sessionStats.dailyStats.slice(0, 5).map((daily, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="px-3 py-2">{daily.played_date}</td>
                                                <td className="px-3 py-2 text-center">{daily.games_count}回</td>
                                                <td className="px-3 py-2 text-center font-bold text-blue-600">{daily.highest_score}点</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            <div className="mt-6">
                <button
                    onClick={onRestart}
                    className={QUIZ_STYLES.buttons.retry}
                >
                    もう一度遊ぶ
                </button>
            </div>
        </div>
    );
}
