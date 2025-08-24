import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';

interface UsageStat {
    date: string;
    session_id: string;
    game_type: string;
    total_games: number;
    highest_score: number;
    average_score: number;
    first_played: string;
    last_played: string;
}

interface TotalStats {
    total_sessions: number;
    total_games: number;
    total_days_used: number;
    average_games_per_session: number;
}

interface Props {
    dailyStats: {
        data: UsageStat[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    totalStats: TotalStats;
    filters: {
        date_from: string;
        date_to: string;
    };
}

export default function UsageIndex({ dailyStats, totalStats, filters }: Props) {
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    // フィルタの適用
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(route('admin.usage.index'), {
                date_from: dateFrom || '',
                date_to: dateTo || '',
            }, {
                preserveState: true,
                replace: true,
            });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [dateFrom, dateTo]);

    const clearFilters = () => {
        setDateFrom('');
        setDateTo('');
    };

    const getGameTypeName = (gameType: string) => {
        switch (gameType) {
            case 'choice': return '三択クイズ';
            case 'input': return '入力クイズ';
            case 'input_advanced': return '入力クイズ(上級)';
            default: return gameType;
        }
    };

    const formatDateTime = (dateTime: string) => {
        return new Date(dateTime).toLocaleString('ja-JP');
    };

    const formatSessionId = (sessionId: string) => {
        return sessionId.slice(-8); // 最後の8文字を表示
    };

    return (
        <AppLayout>
            <Head title="利用履歴" />
            
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6">
                        {/* ヘッダー */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">利用履歴</h2>
                            <p className="text-gray-600 mt-1">日別・セッション別の利用状況を確認できます</p>
                        </div>

                        {/* 全体統計 */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">全体統計</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <div className="text-sm text-blue-600 font-medium">総セッション数</div>
                                    <div className="text-2xl font-bold text-blue-800">{totalStats.total_sessions}</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <div className="text-sm text-green-600 font-medium">総ゲーム数</div>
                                    <div className="text-2xl font-bold text-green-800">{totalStats.total_games}</div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                    <div className="text-sm text-purple-600 font-medium">利用日数</div>
                                    <div className="text-2xl font-bold text-purple-800">{totalStats.total_days_used}</div>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                    <div className="text-sm text-orange-600 font-medium">平均ゲーム数/セッション</div>
                                    <div className="text-2xl font-bold text-orange-800">
                                        {Math.round(totalStats.average_games_per_session * 10) / 10}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 日付フィルタ */}
                        <div className="mb-6 space-y-4">
                            <h3 className="text-lg font-bold text-gray-800">フィルタ</h3>
                            <div className="flex gap-4 items-center flex-wrap">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">開始日</label>
                                    <input
                                        type="date"
                                        value={dateFrom || ''}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">終了日</label>
                                    <input
                                        type="date"
                                        value={dateTo || ''}
                                        onChange={(e) => setDateTo(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    onClick={clearFilters}
                                    className="mt-6 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    クリア
                                </button>
                            </div>
                        </div>

                        {/* 利用履歴テーブル */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            日付
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            セッションID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ゲーム種類
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            プレイ回数
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            最高得点
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            平均得点
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            利用時間
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dailyStats.data.map((stat, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {stat.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-mono text-gray-900">
                                                    {formatSessionId(stat.session_id)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {getGameTypeName(stat.game_type)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {stat.total_games}回
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <span className="font-bold text-green-600">{stat.highest_score}</span>点
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {Math.round(stat.average_score * 10) / 10}点
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div>{formatDateTime(stat.first_played)}</div>
                                                {stat.first_played !== stat.last_played && (
                                                    <div className="text-xs">～ {formatDateTime(stat.last_played)}</div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* ページネーション */}
                        {dailyStats.last_page > 1 && (
                            <div className="mt-6 flex justify-center">
                                <nav className="flex space-x-2">
                                    {dailyStats.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-2 text-sm rounded ${
                                                link.active
                                                    ? 'bg-blue-500 text-white'
                                                    : link.url
                                                    ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}

                        {/* 空の状態 */}
                        {dailyStats.data.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    {dateFrom || dateTo ? '指定された期間の利用履歴はありません。' : 'まだ利用履歴がありません。'}
                                </p>
                                {(dateFrom || dateTo) && (
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 inline-block bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
                                    >
                                        フィルタをクリア
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
