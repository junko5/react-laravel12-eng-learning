<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 管理者ユーザーが既に存在するかチェック
        if (!User::where('email', 'test@test.com')->exists()) {
            User::create([
                'name' => 'Admin',
                'email' => 'test@test.com',
                'password' => Hash::make('testaaa'),
                'is_admin' => true,
                'email_verified_at' => now(),
            ]);
            
            $this->command->info('管理者ユーザーを作成しました:');
            $this->command->info('Email: test@test.com');
            $this->command->info('Password: testaaa');
        } else {
            $this->command->info('管理者ユーザーは既に存在します。');
        }
    }
}
