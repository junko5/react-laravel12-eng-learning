<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameSession extends Model
{
    protected $fillable = [
        'session_id',
        'game_type',
        'score',
    ];

    /**
     * セッションIDと日付でのクエリスコープ
     */
    public function scopeBySessionAndDate($query, $sessionId, $date = null)
    {
        $query->where('session_id', $sessionId);
        
        if ($date) {
            $query->whereDate('created_at', $date);
        }
        
        return $query;
    }

    /**
     * セッションIDでの統計取得
     */
    public static function getStatsForSession($sessionId)
    {
        $today = now()->toDateString();
        
        return [
            'todayCount' => self::bySessionAndDate($sessionId, $today)->count(),
            'highestScore' => self::where('session_id', $sessionId)->max('score') ?? 0,
            'totalGames' => self::where('session_id', $sessionId)->count(),
        ];
    }

    /**
     * セッションIDと特定のゲームタイプでの統計取得
     */
    public static function getStatsForSessionAndGame($sessionId, $gameType)
    {
        $today = now()->toDateString();
        
        return [
            'todayCount' => self::bySessionAndDate($sessionId, $today)->where('game_type', $gameType)->count(),
            'highestScore' => self::where('session_id', $sessionId)->where('game_type', $gameType)->max('score') ?? 0,
            'totalGames' => self::where('session_id', $sessionId)->where('game_type', $gameType)->count(),
        ];
    }

    /**
     * セッションIDでの日別統計取得
     */
    public static function getDailyStatsForSession($sessionId, $limit = 10)
    {
        return self::selectRaw('DATE(created_at) as played_date, COUNT(*) as games_count, MAX(score) as highest_score')
            ->where('session_id', $sessionId)
            ->groupBy('played_date')
            ->orderBy('played_date', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * セッションIDと特定のゲームタイプでの日別統計取得
     */
    public static function getDailyStatsForSessionAndGame($sessionId, $gameType, $limit = 10)
    {
        return self::selectRaw('DATE(created_at) as played_date, COUNT(*) as games_count, MAX(score) as highest_score')
            ->where('session_id', $sessionId)
            ->where('game_type', $gameType)
            ->groupBy('played_date')
            ->orderBy('played_date', 'desc')
            ->limit($limit)
            ->get();
    }
}
