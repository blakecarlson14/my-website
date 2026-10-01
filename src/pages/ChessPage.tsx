import { chess } from "../config";

const steps = [
  {
    title: "Code describes the board",
    body: "For every position, code writes plain-language facts: where the pieces stand, what is attacked or undefended, and what each legal move captures, threatens or allows.",
  },
  {
    title: "Jev ranks every legal move",
    body: "TypeSafe’s Jev answers typed questions instead of writing text. It gets one multiple-choice question over all the legal moves. Deep mode also scores each move three ways.",
  },
  {
    title: "Its top pick is played",
    body: "Code never removes a move before Jev sees it and never overrides Jev’s choice. Every blunder and every good move is Jev’s own.",
  },
];

const stats = [
  { value: "~1240", label: "Fast mode, rough Stockfish-scale rating" },
  { value: "~1430", label: "Deep mode, rough Stockfish-scale rating" },
  { value: "1", label: "API request per move" },
];

export default function ChessPage() {
  const open = chess.access === "open";

  return (
    <>
      <section className="wrap page-head">
        <p className="eyebrow">AI · Chess</p>
        <h1>Jev Plays Chess</h1>
        <p className="lede">
          You play White against Jev, a fast model that has never been given a chess engine. It sees the board only
          as plain-language facts, then chooses every move itself.
        </p>
        <div className="hero__actions">
          <a href={chess.url} className="button" target="_blank" rel="noreferrer">
            Play Jev <span aria-hidden="true">↗</span>
          </a>
          {chess.source && <a href={chess.source} className="button button--ghost" target="_blank" rel="noreferrer">Source code</a>}
        </div>
        {!open && (
          <p className="notice">
            The game is invite-only for now. If someone sent you an invite link, open that link first. After that,
            the Play button works on this device.
          </p>
        )}
      </section>

      {open && (
        <section className="wrap section" aria-label="Game">
          <div className="embed">
            <iframe src={chess.url} title="Jev Plays Chess" loading="lazy" />
          </div>
          <p className="embed__caption">
            Board too small? <a href={chess.url} target="_blank" rel="noreferrer">Open the game in its own tab</a>.
          </p>
        </section>
      )}

      <section className="wrap section" aria-labelledby="how">
        <h2 id="how" className="section__title">How it works</h2>
        <ol className="steps">
          {steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section" aria-labelledby="strength">
        <h2 id="strength" className="section__title">How strong is it?</h2>
        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <p className="section__intro">
          These are estimates from full games against Stockfish at fixed strengths, backed by grading Jev’s moves on a
          set of Stockfish-scored positions. Expect a casual club player. It finds tactics and also hangs a piece
          now and then.
        </p>
      </section>
    </>
  );
}
