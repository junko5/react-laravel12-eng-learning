<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\AdminController;

Route::get('/', [QuizController::class, 'index'])->name('home');
Route::get('/quiz/choice', [QuizController::class, 'choice'])->name('quiz.choice');
Route::get('/quiz/input', [QuizController::class, 'input'])->name('quiz.input');
Route::get('/quiz/input_advanced', [QuizController::class, 'input_advanced'])->name('quiz.input_advanced');

// ゲーム統計API
Route::post('/api/record-game', [QuizController::class, 'recordGameResult'])->name('api.record-game');
Route::get('/api/session-stats', [QuizController::class, 'getSessionStats'])->name('api.session-stats');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// 管理者専用ルート
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // 英単語管理
    Route::get('/words', [AdminController::class, 'index'])->name('words.index');
    Route::get('/words/create', [AdminController::class, 'create'])->name('words.create');
    Route::post('/words', [AdminController::class, 'store'])->name('words.store');
    Route::get('/words/{word}/edit', [AdminController::class, 'edit'])->name('words.edit');
    Route::put('/words/{word}', [AdminController::class, 'update'])->name('words.update');
    Route::delete('/words/{word}', [AdminController::class, 'destroy'])->name('words.destroy');
    
    // 利用履歴
    Route::get('/usage', [AdminController::class, 'usageStats'])->name('usage.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
