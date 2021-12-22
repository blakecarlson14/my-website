import React from "react"
import Home from "./pages/home/Home.js"
import MemeGenerator from "./pages/projects/meme-generator/MemeGenerator.js"
import BitcoinTester from "./pages/projects/bitcoin-tester/BitcoinTester.js";
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';


export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/projects/meme-generator" element={<MemeGenerator />}/>
          <Route exact path="/projects/bitcoin-tester" element={<BitcoinTester />}/>
        </Routes>
      </Router>
    </div>
  )
}