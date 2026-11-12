# blakeacarlson.com

My personal site: React 19, TypeScript and Vite, with plain CSS (no UI framework). It is hosted on GitHub Pages from the `gh-pages` branch.

```bash
npm install
npm run dev       # http://localhost:5173
npm test          # calculator logic tests
npm run deploy    # build, then publish dist/ to the gh-pages branch
```

## Layout

| Path | What it is |
|---|---|
| `src/config.ts` | Site links and the Jev Plays Chess settings |
| `src/pages/Home.tsx` | Intro paragraph and the project index |
| `src/components/ChessDiagram.tsx` | Book-style chess diagram; holds the real Jev position shown on the site |
| `public/img/hollow-mine.png` | Gameplay screenshot (384x216, shown pixelated) |
| `src/pages/ChessPage.tsx` | Jev Plays Chess: link, optional embed, how it works |
| `src/pages/CalculatorPage.tsx`, `src/lib/calculator.ts` | Calculator UI and its tested state machine |
| `src/pages/MemePage.tsx` | Canvas meme generator using imgflip templates |
| `src/pages/HollowMinePage.tsx` | The Hollow Mine: start button, embedded game, controls |
| `public/games/the-hollow-mine/` | The game's Godot web export, served as static files |
| `src/styles.css` | All styles; colors are tokens at the top, with light and dark themes |

## Routing on GitHub Pages

The site uses real paths (`/chess`), not hash URLs. The build copies `index.html` to `404.html`, so GitHub Pages serves the app for any path and React Router takes it from there. Old `/#/...` links are redirected on load.

## Jev Plays Chess

The game runs on its own server (see the jev-plays-chess repo). Set `chess.url` in `src/config.ts` to its address and `chess.access` to match how it is deployed:

- `"invite"`: the server has `ACCESS_CODE` set. The page links to the game and says it is invite-only.
- `"open"`: no access code. The page also embeds the game in an iframe.

Never put the access code in this repo; everything here is public.

## The Hollow Mine

The game is a Godot 4.7 project in the the-hollow-mine repo. Its `Web` export preset builds a single-threaded version, which GitHub Pages can serve without special headers. To update the game here, export it from that repo and copy the output over this site's copy:

```bash
Godot_v4.7.2-stable_win64_console.exe --headless --path . --export-release "Web" build/web/index.html
cp build/web/* ../my-website/public/games/the-hollow-mine/
```

Then run `npm run deploy` here. The page lives at `/hollow-mine`; the static export is at `/games/the-hollow-mine/`, so those two paths must stay different.
