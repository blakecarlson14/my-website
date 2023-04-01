import React from "react"
import Home from "./pages/Home/Home"
import MemeGenerator from "./pages/projects/meme-generator/MemeGenerator"
import BitcoinTester from "./pages/projects/bitcoin-tester/BitcoinTester";
import CryptoCharts from "./pages/projects/crypto-charts/CryptoCharts"
import Mtg from "./pages/projects/mtg/Mtg"
import { Lol } from "./pages/projects/lol/Lol"
import { LolChampions } from "./pages/projects/lol/LolChampions.js";
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import { ChatGpt } from "./pages/projects/chatgpt/ChatGpt.jsx";
import "./styles.css"
import { LolAccountScraper } from "./pages/projects/lol/LolAccountScraper.js";
import { Calculator } from "./pages/projects/calculator/Calculator.jsx";


export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/projects/meme-generator" element={<MemeGenerator />}/>
          {/* <Route exact path="/projects/bitcoin-tester" element={<BitcoinTester />}/> */}
          <Route exact path="/projects/crypto-charts" element={<CryptoCharts />}/>
          <Route exact path="/projects/mtg" element={<Mtg />}/>
          {/* <Route exact path="/projects/lolaccount" element={<LolAccountScraper />}/> */}
          <Route exact path="/projects/lol" element={<Lol />}/>
          <Route exact path="/projects/lol/champions/*" element={<LolChampions />}/>
          <Route exact path="/projects/chatgpt" element={<ChatGpt />}/>
          <Route exact path="/projects/calculator" element={<Calculator />}/>
        </Routes>
      </Router>
    </div>
  )
}