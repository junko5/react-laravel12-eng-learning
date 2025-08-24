<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // ユーザーがログインしていない、または管理者でない場合は403エラー
        if (!auth()->check() || !auth()->user()->is_admin) {
            abort(403, 'この機能は管理者のみ利用できます。');
        }

        return $next($request);
    }
}
