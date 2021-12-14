import React from 'react'
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import Home from "../pages/Home/Home"
import Projects from "../pages/Projects/Projects"
import { Button } from "semantic-ui-react"
import "./navbar.css"

export default function Navbar() {
  return (
    <Router>
      <nav>
        <Link to="/">
          <Button
            className="homeButton"
          > Home
          </Button>
        </Link>
        <Link to="/projects">
          <Button
            className="projectsButton"
          >
            Projects
          </Button>
        </Link>
      </nav>

      <Routes>
        <Route
          path="/projects"
          element={
            <Projects />
          }
        >
        </Route>
        <Route
          path="/"
          element={
            <Home />
          }
        >
        </Route>
      </Routes>
    </Router>
  )
}