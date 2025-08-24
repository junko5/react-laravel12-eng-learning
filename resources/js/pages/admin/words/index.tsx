import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { EnglishWords } from '@/types/index';

interface Props {
    words: {
        data: EnglishWords[];
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
    filters: {
        search: string;
        sort: string;
        direction: string;
    };
}

export default function WordsIndex({ words, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [sortField, setSortField] = useState(filters.sort || 'id');
    const [sortDirection, setSortDirection] = useState(filters.direction || 'asc');

    // 検索の実行（デバウンス付き）
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(route('admin.words.index'), {
                search: search || '',
                sort: sortField || 'id',
                direction: sortDirection || 'asc',
            }, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, sortField, sortDirection]);

    const handleDelete = (id: number) => {
        if (confirm('この英単語を削除してもよろしいですか？')) {
            router.delete(route('admin.words.destroy', id), {
                onSuccess: () => {
                    // 削除成功後の処理
                },
            });
        }
    };

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const clearFilters = () => {
        setSearch('');
        setSortField('id');
        setSortDirection('asc');
    };

    return (
        <AppLayout>
            <Head title="英単語管理" />
            
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6">
                        {/* ヘッダー */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">英単語管理</h2>
                            <Link
                                href={route('admin.words.create')}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                            >
                                新規追加
                            </Link>
                        </div>

                        {/* 検索・フィルタ */}
                        <div className="mb-6 space-y-4">
                            <div className="flex gap-4 items-center">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={search || ''}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="英単語または意味で検索..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    クリア
                                </button>
                            </div>

                            {/* 統計情報 */}
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-gray-700">
                                    {search ? (
                                        <>
                                            検索結果: <span className="font-bold text-blue-600">{words.total}</span>件
                                            （「<span className="font-medium">{search}</span>」で検索）
                                        </>
                                    ) : (
                                        <>
                                            全<span className="font-bold text-blue-600">{words.total}</span>語を管理中
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* 英単語テーブル */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th 
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('id')}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>ID</span>
                                                {sortField === 'id' && (
                                                    <span className="text-blue-500">
                                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                        <th 
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('word')}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>英単語</span>
                                                {sortField === 'word' && (
                                                    <span className="text-blue-500">
                                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                        <th 
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('meaning')}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>意味</span>
                                                {sortField === 'meaning' && (
                                                    <span className="text-blue-500">
                                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                        <th 
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort('created_at')}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>作成日</span>
                                                {sortField === 'created_at' && (
                                                    <span className="text-blue-500">
                                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            操作
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {words.data.map((word) => (
                                        <tr key={word.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {word.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {word.word}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {word.meaning}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(word.created_at).toLocaleDateString('ja-JP')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <Link
                                                    href={route('admin.words.edit', word.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                >
                                                    編集
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(word.id)}
                                                    className="text-red-600 hover:text-red-900 transition-colors"
                                                >
                                                    削除
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* ページネーション */}
                        {words.last_page > 1 && (
                            <div className="mt-6 flex justify-center">
                                <nav className="flex space-x-2">
                                    {words.links.map((link, index) => (
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
                        {words.data.length === 0 && (
                            <div className="text-center py-12">
                                {search ? (
                                    <>
                                        <p className="text-gray-500 text-lg">
                                            「{search}」に該当する英単語は見つかりませんでした。
                                        </p>
                                        <button
                                            onClick={clearFilters}
                                            className="mt-4 inline-block bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
                                        >
                                            検索をクリア
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-gray-500 text-lg">英単語がまだ登録されていません。</p>
                                        <Link
                                            href={route('admin.words.create')}
                                            className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                                        >
                                            最初の英単語を追加
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
