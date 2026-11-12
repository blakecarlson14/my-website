import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="wrap page-head">
      <h1>That page isn’t here.</h1>
      <p className="lede">It may have been part of the old site. Error 404.</p>
      <p className="actions"><Link to="/" className="button">Back home</Link></p>
    </section>
  );
}
