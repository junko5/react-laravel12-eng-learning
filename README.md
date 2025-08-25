# 英単語学習アプリ・くまたと英単語（Laravel 12 + React）
中学3年生・高校受験生向けの英単語学習ゲームです。
英語が苦手でも ゲーム感覚で単語を覚えられるように工夫しています。

<div align="center">

### 📱 アプリ画面

| トップ画面 | ゲーム画面 |
|:---:|:---:|
| <img src="https://biz.addisteria.com/wp-content/uploads/2025/08/kumata_eitango01.png" alt="くまたと英単語 - メイン画面" width="300"><br>**メイン画面** | <img src="https://biz.addisteria.com/wp-content/uploads/2025/08/kumata_eitango02.png" alt="くまたと英単語 - クイズ画面" width="300"><br>**プログレスバー付き上級編** |

| 管理者画面 | 結果画面 |
|:---:|:---:|
| <img src="https://biz.addisteria.com/wp-content/uploads/2025/08/kumata_eitango03.png" alt="くまたと英単語 - 管理者画面" width="300"><br>**英単語管理画面（管理者用）** | <img src="https://biz.addisteria.com/wp-content/uploads/2025/08/kumata_eitango04.png" alt="くまたと英単語 - 結果画面" width="300"><br>**スコア・間違えた単語表示** |

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
- 🔐 **管理者画面**で英単語の追加・編集・削除が可能
- 🕐 **セッション持続**：学習データを1週間保持

## 🚀 技術スタック

```
🔧 Backend:  Laravel 12 (Inertia.js)
⚛️ Frontend: React + TypeScript
🎨 Style:    Tailwind CSS
🗄️ Database: MySQL / SQLite
```

## 📦 セットアップ

```bash
# バックエンド
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed --class=EnglishWordsSeeder
php artisan db:seed --class=AdminUserSeeder

# フロントエンド
npm install
npm run dev

# 起動
php artisan serve
```

※ サンプル英単語10語が追加されます
※ 管理者ユーザーも自動で作成されます（詳細は AdminUserSeeder.php を参照）

## 📊 データベース構造

```sql
english_words テーブル
- id (主キー)
- word (英単語)
- meaning (日本語)
- level (レベル）
- created_at, updated_at
```

👉 必要に応じて、覚えたい単語を自由に追加できます。

## 👤 管理者機能

管理者ログイン後、英単語の追加・編集・削除が可能です。

### 管理者アカウント

初期セットアップ時に作成されます（AdminUserSeeder.php 参照）。

**⚠️ セキュリティ上の注意**
- 本番環境では必ず管理者アカウント（メール・パスワード）を変更してください。

---

<div align="center">

**Happy Learning! 📚✨**

</div>
