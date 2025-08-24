import { Head, Link, usePage } from '@inertiajs/react';
import { Author } from './author';
import type { GameStats, QuizSessionData } from '@/types';

interface Props {
    stats: GameStats;
    sessionId: string;
}

export default function Welcome() {
    const { stats } = usePage().props as Props;
    return (
        <>
            <Head title="くまたと英単語" />

            <div className="min-h-screen bg-gradient-to-br from-sky-300 via-cyan-200 to-blue-300 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
                    <div className="text-center">
                        {/* ヘッダー部分 */}
                        <div className="mb-8">
                            <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                                <img
                                    src="/img/kumata.png"
                                    alt="くまた"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">くまたと英単語</h1>
                            <p className="text-gray-600 text-lg mb-2">高校受験時の英単語力が目安</p>

                            {/* 今日の統計表示 */}
                            {stats && (
                                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                    <p className="text-gray-700 text-sm">
                                        今日<span className="font-bold text-blue-600">{stats.todayCount}</span>回チャレンジしました。
                                        <br />
                                        これまで<span className="font-bold text-blue-600">{stats.totalGames}</span>回チャレンジしました。
                                    </p>
                                </div>
                            )}

                            <p className="text-gray-500 text-sm">どちらのクイズモードで遊びますか？</p>
                        </div>

                        {/* クイズモード選択 */}
                        <div className="space-y-4">
                            <Link
                                href={route('quiz.choice')}
                                className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-6 px-8 rounded-xl hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                <div className="text-2xl mb-2">🎯</div>
                                <div className="text-xl mb-1">三択（簡単）</div>
                                <div className="text-sm opacity-90">3つの選択肢から正解を選ぼう</div>
                            </Link>

                            <Link
                                href={route('quiz.input')}
                                className="block w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold py-6 px-8 rounded-xl hover:from-pink-500 hover:to-rose-500 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                <div className="text-2xl mb-2">✏️</div>
                                <div className="text-xl mb-1">英単語入力（普通）</div>
                                <div className="text-sm opacity-90">日本語を見て英語を入力しよう</div>
                            </Link>

                            <Link
                                href={route('quiz.input_advanced')}
                                className="block w-full bg-gradient-to-r from-red-300 to-red-400 text-white font-bold py-6 px-8 rounded-xl hover:from-red-500 hover:to-red-500 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                <div className="text-2xl mb-2">✏️</div>
                                <div className="text-xl mb-1">おすすめ☆英単語入力（上級）</div>
                                <div className="text-sm opacity-90">時間内に回答必須！日本語を見て英語を入力しよう</div>
                            </Link>
                        </div>

                        {/* 注意事項 */}
                        <div className="mt-6 text-xs text-gray-500">
                            <p>※ セッション情報でゲーム記録を保存します。個人情報は収集しません。</p>
                        </div>

                        {/* 説明文 */}
                        <div className="mt-8 text-gray-500 text-sm">

                            <p>どちらも5問のクイズです</p>
                            <p className="mt-1">頑張って満点を目指そう！ 🎉</p>
                        </div>
                        {/* この部分はご自由に変更してください。 */}
                        <Author />
                    </div>
                </div>
            </div>
        </>
    );
}
