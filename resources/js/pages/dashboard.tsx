import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage().props as { auth: { user: User } };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* 管理者専用セクション */}
                {auth.user.is_admin && (
                    <div className="bg-white p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border shadow-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">管理者メニュー</h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Link
                                href={route('admin.words.index')}
                                className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                            >
                                <div className="text-2xl mb-2">📚</div>
                                <h3 className="font-bold text-blue-800">英単語管理</h3>
                                <p className="text-sm text-blue-600">英単語の追加・編集・削除</p>
                            </Link>
                            
                            <Link
                                href={route('home')}
                                className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors"
                            >
                                <div className="text-2xl mb-2">🎮</div>
                                <h3 className="font-bold text-green-800">クイズ画面</h3>
                                <p className="text-sm text-green-600">実際のクイズ画面を確認</p>
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}
