import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// おみくじの結果
const fortunes = [
  { result: '大吉', message: '最高の運勢です！何をやっても上手くいくでしょう。', color: '#FFD700' },
  { result: '中吉', message: '良い運勢です。積極的に行動しましょう。', color: '#FFA500' },
  { result: '小吉', message: 'まずまずの運勢。小さな幸せを大切に。', color: '#90EE90' },
  { result: '吉', message: '穏やかな一日になりそうです。', color: '#87CEEB' },
  { result: '末吉', message: '後から運が開けてきます。焦らずに。', color: '#DDA0DD' },
  { result: '凶', message: '慎重に行動しましょう。災い転じて福となす。', color: '#CD5C5C' },
  { result: '大凶', message: 'これ以上悪くなることはありません。あとは上がるだけ！', color: '#8B0000' },
];

// 自己破壊フラグ
let isDestroyed = false;

// 破壊するファイル一覧
const filesToDestroy = [
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'index.html',
  'vite.config.ts',
  'package.json',
];

// おみくじAPI
app.post('/api/fortune', async (req, res) => {
  if (isDestroyed) {
    return res.status(410).json({
      error: 'このおみくじは既に使用され、自己破壊しました。',
      destroyed: true
    });
  }

  // ランダムにおみくじを選ぶ
  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];

  // 結果を返してから自己破壊
  res.json({ ...fortune, willDestroy: true });

  // 少し待ってから破壊開始
  setTimeout(() => {
    console.log('\n🔥 自己破壊シーケンス開始...\n');
    isDestroyed = true;

    filesToDestroy.forEach((file, index) => {
      setTimeout(() => {
        const filePath = path.join(__dirname, file);
        try {
          if (fs.existsSync(filePath)) {
            // ファイルの内容を破壊メッセージで上書き
            const destroyMessage = `
// ==========================================
// 🔥 このファイルは自己破壊されました 🔥
// ==========================================
//
// おみくじは一度しか引けません。
// このアプリは役目を終えました。
//
// さようなら...
//
// ==========================================
`;
            fs.writeFileSync(filePath, destroyMessage, 'utf8');
            console.log(`💀 破壊完了: ${file}`);
          }
        } catch (err) {
          console.error(`破壊失敗: ${file}`, err.message);
        }
      }, index * 500);
    });

    // 最後にサーバー自身も破壊
    setTimeout(() => {
      const serverPath = path.join(__dirname, 'server.js');
      const finalMessage = `
// ==========================================
// 🔥 サーバーは自己破壊されました 🔥
// ==========================================
//
// おみくじの結果は... 秘密です。
//
// このアプリは二度と動きません。
// 新しい運命を切り開いてください。
//
// さようなら、そしてありがとう。
//
// ==========================================
`;
      fs.writeFileSync(serverPath, finalMessage, 'utf8');
      console.log('\n💀 サーバー自己破壊完了');
      console.log('🙏 さようなら...\n');
      process.exit(0);
    }, filesToDestroy.length * 500 + 1000);

  }, 2000);
});

// ステータス確認API
app.get('/api/status', (req, res) => {
  res.json({ destroyed: isDestroyed });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n🎋 おみくじサーバー起動中: http://localhost:${PORT}`);
  console.log('⚠️  警告: おみくじを引くとこのアプリは自己破壊します！\n');
});
