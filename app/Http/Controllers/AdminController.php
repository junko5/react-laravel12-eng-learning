<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EnglishWords;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\GameSession;

class AdminController extends Controller
{
    /**
     * 英単語一覧表示
     */
    public function index(Request $request): Response
    {
        $query = EnglishWords::query();

        // 検索フィルタ
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where('word', 'like', "%{$search}%")
                  ->orWhere('meaning', 'like', "%{$search}%");
        }

        // ソート
        $sortField = $request->get('sort', 'id');
        $sortDirection = $request->get('direction', 'asc');
        
        $allowedSorts = ['id', 'word', 'meaning', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        } else {
            $query->orderBy('id', 'asc');
        }

        $words = $query->paginate(20)->withQueryString();
        
        return Inertia::render('admin/words/index', [
            'words' => $words,
            'filters' => [
                'search' => $request->get('search', ''),
                'sort' => $sortField,
                'direction' => $sortDirection,
            ],
        ]);
    }

    /**
     * 英単語編集画面表示
     */
    public function edit(EnglishWords $word): Response
    {
        return Inertia::render('admin/words/edit', [
            'word' => $word,
        ]);
    }

    /**
     * 英単語更新
     */
    public function update(Request $request, EnglishWords $word)
    {
        $request->validate([
            'word' => 'required|string|max:255',
            'meaning' => 'required|string|max:255',
        ]);

        $word->update([
            'word' => $request->word,
            'meaning' => $request->meaning,
        ]);

        return redirect()->route('admin.words.index')
            ->with('success', '英単語を更新しました。');
    }

    /**
     * 英単語作成画面表示
     */
    public function create(): Response
    {
        return Inertia::render('admin/words/create');
    }

    /**
     * 英単語作成
     */
    public function store(Request $request)
    {
        $request->validate([
            'word' => 'required|string|max:255',
            'meaning' => 'required|string|max:255',
        ]);

        EnglishWords::create([
            'word' => $request->word,
            'meaning' => $request->meaning,
        ]);

        return redirect()->route('admin.words.index')
            ->with('success', '英単語を追加しました。');
    }

    /**
     * 英単語削除
     */
    public function destroy(EnglishWords $word)
    {
        $word->delete();

        return redirect()->route('admin.words.index')
            ->with('success', '英単語を削除しました。');
    }

    /**
     * 利用履歴表示
     */
    public function usageStats(Request $request): Response
    {
        $query = GameSession::query();

        // 日付フィルタ
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->get('date_from'));
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->get('date_to'));
        }

        // 日別・セッション別統計
        $dailyStats = $query->selectRaw('
                DATE(created_at) as date,
                session_id,
                game_type,
                COUNT(*) as total_games,
                MAX(score) as highest_score,
                AVG(score) as average_score,
                MIN(created_at) as first_played,
                MAX(created_at) as last_played
            ')
            ->groupBy(['date', 'session_id', 'game_type'])
            ->orderBy('date', 'desc')
            ->orderBy('first_played', 'desc')
            ->paginate(20)
            ->withQueryString();

        // 全体統計
        $totalStats = [
            'total_sessions' => GameSession::distinct('session_id')->count(),
            'total_games' => GameSession::count(),
            'total_days_used' => GameSession::selectRaw('COUNT(DISTINCT DATE(created_at)) as count')->first()->count,
            'average_games_per_session' => GameSession::selectRaw('AVG(games_per_session) as avg')
                ->fromSub(
                    GameSession::selectRaw('session_id, COUNT(*) as games_per_session')
                        ->groupBy('session_id'),
                    'sub'
                )->first()->avg ?? 0,
        ];

        return Inertia::render('admin/usage/index', [
            'dailyStats' => $dailyStats,
            'totalStats' => $totalStats,
            'filters' => [
                'date_from' => $request->get('date_from', ''),
                'date_to' => $request->get('date_to', ''),
            ],
        ]);
    }
}