import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { site } from "../config";
import ThemeToggle from "./ThemeToggle";

export default function Layout() {
  const { pathname } = useLocation();
  // Braces matter: newer browsers return a Promise from scrollTo, and React would call it as a cleanup.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="wrap site-header__inner">
          <Link to="/" className="wordmark">{site.name}</Link>
          <nav aria-label="Main">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/chess">Chess</NavLink>
            <NavLink to="/hollow-mine">Game</NavLink>
            <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="wrap site-footer__inner">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <a href={site.github} target="_blank" rel="noreferrer">github.com/blakecarlson14</a>
        </div>
      </footer>
    </>
  );
}
