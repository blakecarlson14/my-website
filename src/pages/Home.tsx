import { Link } from "react-router";
import ChessDiagram, { JEV_MATE } from "../components/ChessDiagram";

export default function Home() {
  return (
    <>
      <section className="wrap intro">
        <h1 className="visually-hidden">Blake Carlson</h1>
        <p>
          I’m Blake, a software engineer. Most of what I build lately asks one question: how far can an AI model get
          on its own? One plays <Link to="/chess">chess</Link> with no engine behind it. Another wrote
          a <Link to="/hollow-mine">whole platformer</Link>, art and music included, from one long prompt.
        </p>
      </section>

      <section className="wrap" aria-labelledby="projects">
        <h2 id="projects" className="visually-hidden">Projects</h2>
        <ol className="work">
          <li className="work__item">
            <div className="work__text">
              <h3><Link to="/chess">Jev Plays Chess</Link></h3>
              <p className="work__meta">AI experiment, 2026</p>
              <p>
                A fast language model plays you at chess with no engine. Code describes the board in plain words and
                Jev picks every move itself. It plays like a casual club player: it finds tactics, and it hangs a
                piece now and then.
              </p>
            </div>
            <Link to="/chess" className="work__figure" tabIndex={-1} aria-hidden="true">
              <ChessDiagram
                {...JEV_MATE}
                caption={<>From a recorded test game: Jev, as White, mates another model with <span className="notation">16. Qd7#</span>.</>}
              />
            </Link>
          </li>

          <li className="work__item">
            <div className="work__text">
              <h3><Link to="/hollow-mine">The Hollow Mine</Link></h3>
              <p className="work__meta">Browser game, Godot, 2026</p>
              <p>
                A 16-bit platformer you can play here in the browser. Claude Code built all of it, every sprite,
                sound and song, from a single prompt and a few short follow-ups.
              </p>
            </div>
            <Link to="/hollow-mine" className="work__figure" tabIndex={-1} aria-hidden="true">
              <figure className="shot">
                <img src="/img/hollow-mine.png" width={384} height={216} alt="" loading="lazy" />
                <figcaption>Wick at the start of the first stage.</figcaption>
              </figure>
            </Link>
          </li>

          <li className="work__item">
            <div className="work__text">
              <h3>
                <a href="https://github.com/blakecarlson14/fantasy-draft-companion" target="_blank" rel="noreferrer">
                  Fantasy Draft Companion<span className="ext" aria-hidden="true">↗</span>
                </a>
              </h3>
              <p className="work__meta">Fantasy football tool, 2026, on GitHub</p>
              <p>
                A live draft assistant. It pulls Sleeper draft data, projections, ADP, rankings and news together to
                recommend your next pick.
              </p>
            </div>
          </li>

          <li className="work__item work__item--small">
            <p>
              And two early exercises from 2021, when I was learning React:
              a <Link to="/lab/calculator">calculator</Link> and a <Link to="/lab/meme-generator">meme generator</Link>.
            </p>
          </li>
        </ol>
      </section>
    </>
  );
}
