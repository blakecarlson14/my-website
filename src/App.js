import React from "react"
import Home from "./pages/home/Home.js"
import MemeGenerator from "./pages/projects/meme-generator/MemeGenerator"
import BitcoinTester from "./pages/projects/bitcoin-tester/BitcoinTester";
import CryptoCharts from "./pages/projects/crypto-charts/CryptoCharts"
import Mtg from "./pages/projects/mtg/Mtg"
import Navbar from "./components/Navbar/Navbar"
import { HashRouter as Router, Route, Routes } from "react-router-dom";
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
          <Route exact path="/projects/crypto-charts" element={<CryptoCharts />}/>
          <Route exact path="/projects/mtg" element={<Mtg />}/>
        </Routes>
      </Router>
    </div>
  )
}