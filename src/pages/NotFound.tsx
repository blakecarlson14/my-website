import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="wrap page-head">
      <p className="eyebrow">404</p>
      <h1>That page isn’t here.</h1>
      <p className="lede">It may have been part of the old site.</p>
      <Link to="/" className="button">Back home</Link>
    </section>
  );
}
