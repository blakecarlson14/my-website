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
| `src/pages/Home.tsx` | Intro, featured project, project and lab lists |
| `src/pages/ChessPage.tsx` | Jev Plays Chess: link, optional embed, how it works |
| `src/pages/CalculatorPage.tsx`, `src/lib/calculator.ts` | Calculator UI and its tested state machine |
| `src/pages/MemePage.tsx` | Canvas meme generator using imgflip templates |
| `src/styles.css` | All styles; colors are tokens at the top, with light and dark themes |

## Routing on GitHub Pages

The site uses real paths (`/chess`), not hash URLs. The build copies `index.html` to `404.html`, so GitHub Pages serves the app for any path and React Router takes it from there. Old `/#/...` links are redirected on load.

## Jev Plays Chess

The game runs on its own server (see the jev-plays-chess repo). Set `chess.url` in `src/config.ts` to its address and `chess.access` to match how it is deployed:

- `"invite"`: the server has `ACCESS_CODE` set. The page links to the game and says it is invite-only.
- `"open"`: no access code. The page also embeds the game in an iframe.

Never put the access code in this repo; everything here is public.
