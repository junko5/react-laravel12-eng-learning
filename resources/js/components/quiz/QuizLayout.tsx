import { Link } from '@inertiajs/react';
import { QUIZ_STYLES } from '@/styles/quiz';

interface QuizLayoutProps {
    children: React.ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
    textAlign?: 'left' | 'center' | 'right';
}

export default function QuizLayout({ children, maxWidth = 'xl', textAlign = 'left' }: QuizLayoutProps) {
    const maxWidthClass = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-xl',
        xl: 'max-w-2xl'
    }[maxWidth];

    const textAlignClass = {
        left: '',
        center: 'text-center',
        right: 'text-right'
    }[textAlign];

    return (
        <div className={QUIZ_STYLES.layout.container}>
            {/* トップへ戻るボタン */}
            <Link
                href="/"
                className={QUIZ_STYLES.layout.backButton}
            >
                ← トップへ戻る
            </Link>
            
            <div className={`${QUIZ_STYLES.layout.mainCard} ${maxWidthClass} ${textAlignClass}`}>
                {children}
            </div>
        </div>
    );
}
