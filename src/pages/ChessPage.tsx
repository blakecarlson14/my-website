import ChessDiagram, { JEV_MATE } from "../components/ChessDiagram";
import { chess } from "../config";

const steps = [
  {
    title: "Code describes the board.",
    body: "For every position, code writes plain-language facts: where the pieces stand, what is attacked or undefended, and what each legal move captures, threatens or allows.",
  },
  {
    title: "Jev ranks every legal move.",
    body: "TypeSafe’s Jev answers typed questions instead of writing text. It gets one multiple-choice question over all the legal moves, so each move is a single API request. Deep mode also scores each move three ways.",
  },
  {
    title: "Its top pick is played.",
    body: "Code never removes a move before Jev sees it and never overrides Jev’s choice. Every blunder and every good move is Jev’s own.",
  },
];

export default function ChessPage() {
  const open = chess.access === "open";

  return (
    <>
      <section className="wrap page-head page-head--split">
        <div>
          <h1>Jev Plays Chess</h1>
          <p className="lede">
            You play White against Jev, a fast model that has never been given a chess engine. It sees the board only
            as plain-language facts, then chooses every move itself.
          </p>
          <p className="actions">
            <a href={chess.url} className="button" target="_blank" rel="noreferrer">
              Play Jev <span aria-hidden="true">↗</span>
            </a>
            {chess.source && <a href={chess.source} target="_blank" rel="noreferrer">Source code</a>}
          </p>
          {!open && (
            <p className="note">
              The game is invite-only for now. If someone sent you an invite link, open that link first. After that,
              the Play button works on this device.
            </p>
          )}
        </div>
        <ChessDiagram
          {...JEV_MATE}
          caption={
            <>
              From a recorded test game on 22 September 2026: Jev, as White, mates GPT-5.6 Luna
              with <span className="notation">16. Qd7#</span>.
            </>
          }
        />
      </section>

      {open && (
        <section className="wrap section" aria-label="Game">
          <div className="embed">
            <iframe src={chess.url} title="Jev Plays Chess" loading="lazy" />
          </div>
          <p className="caption">
            Board too small? <a href={chess.url} target="_blank" rel="noreferrer">Open the game in its own tab</a>.
          </p>
        </section>
      )}

      <section className="wrap section prose" aria-labelledby="how">
        <h2 id="how">How it works</h2>
        <ol className="numbered">
          {steps.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong> {step.body}
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section prose" aria-labelledby="strength">
        <h2 id="strength">How strong it is</h2>
        <table className="data">
          <thead>
            <tr><th scope="col">Mode</th><th scope="col" className="num">Rough rating</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Fast</th><td className="num">~1240</td></tr>
            <tr><th scope="row">Deep</th><td className="num">~1430</td></tr>
          </tbody>
        </table>
        <p>
          These are estimates on a Stockfish scale, from full games against Stockfish at fixed strengths, backed by
          grading Jev’s moves on a set of Stockfish-scored positions. Expect a casual club player. It finds tactics
          and also hangs a piece now and then.
        </p>
      </section>
    </>
  );
}
