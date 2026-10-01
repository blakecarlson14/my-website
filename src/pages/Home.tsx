import { Link } from "react-router";
import MiniBoard from "../components/MiniBoard";
import { site } from "../config";

const projects = [
  {
    title: "Fantasy Draft Companion",
    blurb: "A live fantasy football draft assistant. It combines Sleeper draft data, projections, ADP, rankings and news to recommend your next pick.",
    tags: ["Fantasy football", "Live data"],
    href: "https://github.com/blakecarlson14/fantasy-draft-companion",
    cta: "View on GitHub",
  },
];

const lab = [
  { title: "Calculator", blurb: "An iPhone-style calculator. One of the first React components I built.", to: "/lab/calculator" },
  { title: "Meme Generator", blurb: "Pick a classic template, add top and bottom text. A React course project.", to: "/lab/meme-generator" },
];

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <p className="eyebrow">Software engineer</p>
        <h1>Hi, I’m Blake. I build things to figure out how they work.</h1>
        <p className="lede">
          Lately that means seeing how far a fast AI model can go on its own, at chess, sports and more.
          This site holds the projects worth sharing and a few early experiments.
        </p>
        <div className="hero__actions">
          <Link to="/chess" className="button">Play Jev at chess</Link>
          <a href={site.github} className="button button--ghost" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="featured">
        <h2 id="featured" className="section__title">Featured</h2>
        <Link to="/chess" className="feature-card">
          <div className="feature-card__body">
            <p className="eyebrow">AI · Chess</p>
            <h3>Jev Plays Chess</h3>
            <p>
              Play against a language model that has never been given a chess engine. Code describes the board in plain
              words, and Jev picks every move itself, about as strong as a casual club player.
            </p>
            <span className="feature-card__cta">Play a game <span aria-hidden="true">→</span></span>
          </div>
          <MiniBoard fen="r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R" highlight={["d2", "d3"]} />
        </Link>
      </section>

      <section className="wrap section" aria-labelledby="projects">
        <h2 id="projects" className="section__title">Projects</h2>
        <div className="card-grid">
          {projects.map((project) => (
            <a key={project.title} className="card" href={project.href} target="_blank" rel="noreferrer">
              <h3>{project.title}</h3>
              <p>{project.blurb}</p>
              <ul className="tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              <span className="card__cta">{project.cta} <span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
      </section>

      <section className="wrap section" aria-labelledby="lab">
        <h2 id="lab" className="section__title">Lab</h2>
        <p className="section__intro">Small things from when I was first learning React.</p>
        <div className="card-grid">
          {lab.map((item) => (
            <Link key={item.title} className="card card--quiet" to={item.to}>
              <h3>{item.title}</h3>
              <p>{item.blurb}</p>
              <span className="card__cta">Open <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
