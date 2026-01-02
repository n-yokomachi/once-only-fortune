import { useState } from 'react';

interface Fortune {
  result: string;
  message: string;
  color: string;
  willDestroy?: boolean;
}

function App() {
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDestroying, setIsDestroying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const drawFortune = async () => {
    setIsDrawing(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 410) {
        const data = await response.json();
        setError(data.error);
        setIsDrawing(false);
        return;
      }

      const data: Fortune = await response.json();
      setFortune(data);
      setIsDrawing(false);

      // 自己破壊アニメーション開始
      setTimeout(() => {
        setIsDestroying(true);
      }, 3000);
    } catch {
      setError('サーバーに接続できません。既に破壊されている可能性があります。');
      setIsDrawing(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 py-10 ${
        isDestroying ? 'animate-burn' : ''
      }`}
    >
      <div className="max-w-md mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          {/* ヘッダー */}
          <div className="text-center">
            <div className="text-6xl mb-2">⛩️</div>
            <h1
              className="text-4xl font-bold text-yellow-300"
              style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}
            >
              おみくじ
            </h1>
          </div>

          {/* エラー表示 */}
          {error && (
            <div className="bg-red-900 border border-red-600 rounded-lg p-4 w-full">
              <div className="flex items-center gap-2">
                <span className="text-red-400">⚠️</span>
                <div>
                  <div className="font-bold text-red-200">エラー</div>
                  <div className="text-red-300 text-sm">{error}</div>
                </div>
              </div>
            </div>
          )}

          {/* おみくじを引く前 */}
          {!fortune && !error && (
            <div className="flex flex-col items-center gap-6">
              <div className="bg-red-900/80 p-6 rounded-lg border-2 border-red-600">
                <p className="text-red-200 font-bold text-center">⚠️ 警告 ⚠️</p>
                <p className="text-red-300 text-sm mt-2 text-center">
                  このおみくじは一度しか引けません。
                  <br />
                  引いた瞬間、このアプリは
                  <span className="text-red-100 font-bold">自己破壊</span>
                  します。
                </p>
              </div>

              <button
                onClick={drawFortune}
                disabled={isDrawing}
                className="px-12 py-4 text-xl font-bold bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-lg transition-all hover:scale-105 animate-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDrawing ? '運命を占っています...' : '🎋 おみくじを引く'}
              </button>
            </div>
          )}

          {/* おみくじ結果 */}
          {fortune && (
            <div className="flex flex-col items-center gap-6">
              <div
                className="bg-gray-800 p-8 rounded-xl border-4 text-center min-w-[300px]"
                style={{
                  borderColor: fortune.color,
                  boxShadow: `0 0 30px ${fortune.color}`,
                }}
              >
                <div
                  className="text-6xl font-black"
                  style={{
                    color: fortune.color,
                    textShadow: `0 0 20px ${fortune.color}`,
                  }}
                >
                  {fortune.result}
                </div>
                <p className="text-gray-300 mt-4 text-lg">{fortune.message}</p>
              </div>

              {isDestroying && (
                <div className="text-center">
                  <p className="text-red-400 text-lg font-bold">
                    🔥 自己破壊シーケンス実行中... 🔥
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    ソースコードが削除されています...
                  </p>
                  <p className="text-gray-600 text-xs mt-4">さようなら...</p>
                </div>
              )}
            </div>
          )}

          <p className="text-gray-600 text-xs mt-8">
            このアプリは一度しか使用できません
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
