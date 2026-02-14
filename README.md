# Security Guide for WordPress

WordPress セキュリティ Meetup で使用する、初心者向けセキュリティガイドのWebサイトです。

## 概要

WordPress を安全に運用するための基本的なセキュリティ対策を、初心者にもわかりやすく解説するWebサイトです。

### コンテンツ

1. **セキュリティの基本原則** - 4つの原則と多層防御の考え方
2. **よくある誤解を解く** - ログインURL変更の誤解、最小構成の重要性
3. **今日から実践できる5つの対策** - アップデート、バックアップ、パスワード、セキュリティプラグイン、ユーザー管理
4. **トラブル対処法** - よくあるトラブルと解決手順
5. **セキュリティチェックリスト** - Phase別の実施管理（進捗はブラウザに保存）
6. **参考資料** - 公式ドキュメント、セキュリティレポート

## 技術構成

- **HTML/CSS/JavaScript**（フレームワーク不使用）
- **SCSS** でスタイル管理（コンパイル後にCSSを生成）
- ビルドツール不要（SCSS コンパイルのみ npm scripts で実行）
- `localStorage` によるチェックリストの永続化
- レスポンシブデザイン対応
- 印刷用スタイルシート対応
- アクセシビリティ対応（WAI-ARIA、キーボードナビゲーション）
- OGP / Twitter Card 対応（SNSシェア最適化）

## ファイル構成

```
├── index.html          # メインページ
├── images/
│   └── ogp.png         # OGP画像（SNSシェア用）
├── css/
│   ├── style.css       # メインスタイル（SCSSからコンパイル）
│   └── print.css       # 印刷用スタイル
├── scss/               # SCSS ソースファイル
│   ├── style.scss      # メインエントリーポイント
│   ├── abstracts/      # 変数、ミックスイン、関数
│   ├── base/           # リセット、タイポグラフィ
│   ├── components/     # カード、チェックリストなど
│   ├── layout/         # ナビ、フッター、セクション
│   ├── responsive/     # ブレークポイント定義
│   └── utilities/      # ヘルパークラス
├── js/
│   └── app.js          # インタラクション（チェックリスト、ナビゲーション）
├── package.json        # npm 設定（SCSS コンパイル用）
└── README.md
```

## 開発

### セットアップ

```bash
npm install
```

### SCSS のコンパイル

```bash
# 開発モード（ソースマップ付き、展開形式）
npm run sass:dev

# ウォッチモード（ファイル変更を監視）
npm run sass:watch

# 本番ビルド（圧縮）
npm run sass:build
```

## デプロイ

GitHub + Cloudflare Pages で静的ホスティングしています。  
`main` ブランチへの push で自動デプロイされます。

🌐 **公開先URL**: https://security-guide-for-wordpress.pages.dev/

## 貢献

内容の改善提案やバグ報告は、[GitHub Issues](https://github.com/rocket-martue/security-guide-for-wordpress/issues) または [Pull Requests](https://github.com/rocket-martue/security-guide-for-wordpress/pulls) でお待ちしています。

## ライセンス

GPLv2 or later

このプロジェクトは WordPress 本体と同じく GPLv2 or later ライセンスの下で公開されています。  
自由に使用、改変、再配布できますが、派生物も同じライセンスで公開する必要があります。
