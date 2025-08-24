<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EnglishWords;
use App\Models\GameSession;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    private const Config = [
        "totalQuestions" => 5,
        "timerDuration" => 15,
        "scoreFirstTry" => 2,
        "scoreSecondTry" => 1,
    ];

    private function getSetting()
    {
        $sessionId = $this->getOrCreateSessionId();
        $stats = GameSession::getStatsForSession($sessionId);
        
        return [
            "config" => self::Config,
            "englishWords" => EnglishWords::all(),
            "stats" => $stats,
            "sessionId" => $sessionId,
        ];
    }

    /**
     * セッションIDを取得または作成
     */
    private function getOrCreateSessionId()
    {
        if (!session()->has('user_session_id')) {
            session(['user_session_id' => uniqid('quiz_', true)]);
        }
        
        return session('user_session_id');
    }

    /**
     * ゲーム結果を記録
     */
    public function recordGameResult(Request $request)
    {
        try {
            $request->validate([
                'gameType' => 'required|string|in:choice,input,input_advanced',
                'score' => 'required|integer|min:0',
            ]);

            $sessionId = $this->getOrCreateSessionId();
            
            GameSession::create([
                'session_id' => $sessionId,
                'game_type' => $request->gameType,
                'score' => $request->score,
            ]);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * セッション統計を取得
     */
    public function getSessionStats(Request $request)
    {
        $sessionId = $this->getOrCreateSessionId();
        $gameType = $request->get('gameType');
        
        if ($gameType) {
            // 特定のゲームタイプの統計
            $stats = GameSession::getStatsForSessionAndGame($sessionId, $gameType);
            $dailyStats = GameSession::getDailyStatsForSessionAndGame($sessionId, $gameType);
        } else {
            // 全体統計
            $stats = GameSession::getStatsForSession($sessionId);
            $dailyStats = GameSession::getDailyStatsForSession($sessionId);
        }
        
        return response()->json([
            'stats' => $stats,
            'dailyStats' => $dailyStats,
        ]);
    }
    
    public function index()
    {
        return Inertia::render('welcome', $this->getSetting());
    }

    public function choice()
    {
        $englishWords = EnglishWords::all();
        return Inertia::render('quiz/choice', $this->getSetting());
    }

    public function input()
    {
        $englishWords = EnglishWords::all();
        return Inertia::render('quiz/input', $this->getSetting());
    }

    public function input_advanced()
    {
        $englishWords = EnglishWords::all();
        return Inertia::render('quiz/input_advanced', $this->getSetting());
    }
}
