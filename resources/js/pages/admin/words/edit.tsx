import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { EnglishWords } from '@/types/index';

interface Props {
    word: EnglishWords;
}

export default function WordsEdit({ word }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        word: word.word,
        meaning: word.meaning,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.words.update', word.id));
    };

    return (
        <AppLayout>
            <Head title={`編集: ${word.word}`} />
            
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6">
                        {/* ヘッダー */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">英単語編集</h2>
                            <Link
                                href={route('admin.words.index')}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
                            >
                                一覧に戻る
                            </Link>
                        </div>

                        {/* 編集フォーム */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="word" className="block text-sm font-medium text-gray-700 mb-2">
                                    英単語 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="word"
                                    value={data.word}
                                    onChange={(e) => setData('word', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.word ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="例: apple"
                                />
                                {errors.word && (
                                    <p className="mt-1 text-sm text-red-600">{errors.word}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="meaning" className="block text-sm font-medium text-gray-700 mb-2">
                                    意味 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="meaning"
                                    value={data.meaning}
                                    onChange={(e) => setData('meaning', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.meaning ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="例: りんご"
                                />
                                {errors.meaning && (
                                    <p className="mt-1 text-sm text-red-600">{errors.meaning}</p>
                                )}
                            </div>

                            {/* プレビュー */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-800 mb-2">プレビュー</h3>
                                <div className="bg-white p-4 rounded border">
                                    <div className="text-xl font-bold text-blue-600 mb-2">
                                        {data.word || '英単語を入力してください'}
                                    </div>
                                    <div className="text-gray-700">
                                        {data.meaning || '意味を入力してください'}
                                    </div>
                                </div>
                            </div>

                            {/* 送信ボタン */}
                            <div className="flex justify-end space-x-4">
                                <Link
                                    href={route('admin.words.index')}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded transition-colors"
                                >
                                    キャンセル
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`font-bold py-2 px-6 rounded transition-colors ${
                                        processing
                                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                                >
                                    {processing ? '更新中...' : '更新'}
                                </button>
                            </div>
                        </form>

                        {/* 削除ボタン */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex justify-start">
                                <button
                                    onClick={() => {
                                        if (confirm('この英単語を削除してもよろしいですか？')) {
                                            router.delete(route('admin.words.destroy', word.id));
                                        }
                                    }}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                                >
                                    この英単語を削除
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
