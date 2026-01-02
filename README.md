# Once Only Fortune

A self-destructing fortune telling app. Draw your fortune once, then watch the code burn.

## Overview

This app has a unique feature: when you draw a fortune, **the source code itself gets destroyed**. After drawing your fortune, the app's source files are overwritten one by one, and the app will never work again.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Express (backend server)

## Installation

```bash
git clone https://github.com/n-yokomachi/once-only-fortune.git
cd once-only-fortune
npm install
```

## Usage

```bash
npm start
```

- Frontend: http://localhost:5173
- Server: http://localhost:3001

## How Self-Destruction Works

When you draw a fortune, the following files are destroyed in sequence:

1. `src/App.tsx`
2. `src/main.tsx`
3. `src/index.css`
4. `index.html`
5. `vite.config.ts`
6. `package.json`
7. `server.js` (destroys itself last)

After destruction, you can restore with `git checkout .`

## Fortune Results

- Daikichi (Great Blessing)
- Chukichi (Middle Blessing)
- Shokichi (Small Blessing)
- Kichi (Blessing)
- Suekichi (Future Blessing)
- Kyo (Curse)
- Daikyo (Great Curse)

## License

MIT
