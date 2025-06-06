# 教育用SQLインジェクション脆弱性学習アプリケーション

## 変更内容

### 新規追加ファイル
- `src/index.ts` - Express.jsサーバーと脆弱なログインAPI実装
- `src/database.ts` - 意図的なSQLインジェクション脆弱性を含むデータベースクラス
- `src/index.test.ts` - APIエンドポイントの単体テスト
- `src/database.test.ts` - データベース機能とSQLインジェクション脆弱性のテスト
- `public/index.html` - 教育用ログインインターフェース
- `package.json` - 依存関係とスクリプト設定
- `tsconfig.json` - TypeScript設定
- `vitest.config.ts` - テスト設定
- `README.md` - 完全なドキュメントとセットアップ手順

### 実装機能
- **脆弱なログインシステム**: 複数のSQLインジェクション攻撃ベクターに対応
- **ユーザーテーブル**: 5人のサンプルユーザーデータを事前投入（admin, john_doe, jane_smith, bob_wilson, alice_brown）
- **教育的フィードバック**: SQLインジェクション攻撃の検出と表示
- **包括的テストスイート**: 11個の単体テストで脆弱性を検証
- **SQLインジェクション攻撃例**: OR条件バイパス（`' OR '1'='1`）、コメント注入（`admin'--`）、UNION攻撃

### 技術スタック
- TypeScript + Express + Vitest
- PostgreSQL形式のデータベース構造（インメモリ実装）
- npm パッケージマネージャー

## 実行方法

### 開発環境セットアップ
```bash
npm install
npm run dev
```
アプリケーションは `http://localhost:3000` で利用可能

### テスト実行
```bash
npm test
```
11個のテストすべてが合格する必要があります

### 本番ビルド
```bash
npm run build
npm start
```

## 備考

### セキュリティ警告
⚠️ **教育用途のみ**: このアプリケーションは意図的なセキュリティ脆弱性を含んでおり、本番環境への展開や実際のユーザーデータでの使用は絶対に行わないでください。

### 学習目的
- SQLインジェクション脆弱性の仕組みを理解
- セキュリティ脆弱性の特定と悪用の練習
- 攻撃成功時の実世界への影響を確認
- 入力検証とパラメータ化クエリの重要性を学習

### 攻撃シナリオ例
1. **OR条件による認証バイパス**: `' OR '1'='1` → 全ユーザー情報を返却
2. **コメント注入**: `admin'--` → adminユーザーのパスワード検証をバイパス
3. **UNION攻撃**: `admin' UNION SELECT * FROM users --` → 完全なユーザーデータベースを抽出

### 依頼者
板垣一成 (i-itagaki@atware.co.jp)

### Devin実行リンク
https://app.devin.ai/sessions/699c45e0b9ec4acaa4620953b738f320
