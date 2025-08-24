# くまたと英単語
中学3年・高校受験生向けの英単語学習ゲームです。
<div align="center">

<img src="https://biz.addisteria.com/wp-content/uploads/2025/08/kumata_eitango01.png" alt="くまたと英単語 - メイン画面" width="400">

<img src="https://biz.addisteria.com/wp-content/uploads/2025/08/kumata_eitango02.png" alt="くまたと英単語 - クイズ画面" width="400">

<img src="https://biz.addisteria.com/wp-content/uploads/2025/08/kumata_eitango03.png" alt="くまたと英単語 - 管理者画面" width="400">
</div>

## 🎮 デモサイト

**🌟 [今すぐ遊んでみる →](https://eng-learning.tools-createmore.com/)**　https://eng-learning.tools-createmore.com

## 🎯 機能

| モード | 説明 | 特徴 |
|--------|------|------|
| 🎯 **三択クイズ** | 英単語を見て日本語を選択 | 気軽に始められる |
| ✏️ **入力クイズ（基礎編）** | 日本語を見て英単語を入力 | ヒント付きで安心 |
| ⚡ **入力クイズ（上級者編）** | 制限時間付きで挑戦 | プログレスバー表示 |

- 📊 **スコア制**でゲーム感覚で学習
- 🐻 **くまたキャラクター**が応援してくれる
- 📱 **レスポンシブ対応**でスマホでも快適
- 🔐 **管理者画面**で英単語の追加・編集・削除が可能
- 🕐 **セッション持続**：ログインセッションは1週間継続

## 🚀 技術スタック

```
🔧 Backend:  Laravel 11
⚛️ Frontend: React + TypeScript
🎨 Style:    Tailwind CSS
🔗 Bridge:   Inertia.js
🗄️ Database: MySQL / SQLite
```

## 📦 セットアップ

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed --class=EnglishWordsSeeder
php artisan db:seed --class=AdminUserSeeder
npm run dev
php artisan serve
```

※ サンプル英単語10語が自動で追加されます
※ 管理者ユーザーも自動で作成されます（詳細は下記参照）

## 📊 データベース構造

```sql
english_words テーブル
- id (主キー)
- word (英単語)
- meaning (日本語の意味)
- level (英単語レベル）
- created_at, updated_at
```

デフォルトで簡単な英単語は入っていますが、データベースに別途覚えたい単語を追加すれば、お好きなようにカスタマイズできます。

## 👤 管理者機能

管理者でログインすると英単語の管理画面にアクセスできます。

### 管理者アカウント

初期セットアップ時に、シーダーを実行することで管理者アカウントが作成されます。

管理者の認証情報は `AdminUserSeeder.php` に記載されています。

**⚠️ セキュリティ上の注意**
- 本番環境では必ずパスワードを変更してください
- `AdminUserSeeder.php`は個人情報を含むため、適切な管理が必要です
- 環境に応じて適切な管理者情報を設定してください

## 🎓 開発背景

中学3年で、英語嫌いな受験生の娘の単語学習のために開発しました。


---

<div align="center">

**Happy Learning! 📚✨**

</div>
