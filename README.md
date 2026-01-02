# Once Only Fortune (おみくじ)

一度しか引けない自己破壊型おみくじアプリ。

## 概要

このアプリは、おみくじを引くと**ソースコード自体が破壊される**という特徴を持っています。一度おみくじを引くと、アプリのソースファイルが順番に上書きされ、二度と動かなくなります。

## 技術スタック

- React + TypeScript
- Vite
- Tailwind CSS
- Express (バックエンドサーバー)

## インストール

```bash
git clone https://github.com/n-yokomachi/once-only-fortune.git
cd once-only-fortune
npm install
```

## 起動

```bash
npm start
```

- フロントエンド: http://localhost:5173
- サーバー: http://localhost:3001

## 自己破壊の仕組み

おみくじを引くと、以下のファイルが順番に破壊されます:

1. `src/App.tsx`
2. `src/main.tsx`
3. `src/index.css`
4. `index.html`
5. `vite.config.ts`
6. `package.json`
7. `server.js` (最後に自分自身も破壊)

破壊後は `git checkout .` で復元できます。

## おみくじの結果

- 大吉
- 中吉
- 小吉
- 吉
- 末吉
- 凶
- 大凶

## License

MIT
