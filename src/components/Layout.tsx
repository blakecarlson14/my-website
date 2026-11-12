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
      <header className="wrap site-header">
        <Link to="/" className="wordmark">{site.name}</Link>
        <nav aria-label="Main">
          <NavLink to="/chess">Chess</NavLink>
          <NavLink to="/hollow-mine">Hollow Mine</NavLink>
          <ThemeToggle />
        </nav>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="wrap site-footer">
        <div className="site-footer__inner">
          <span>{site.name}, {new Date().getFullYear()}. Set in Source Serif.</span>
          <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </>
  );
}
