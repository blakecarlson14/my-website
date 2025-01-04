import React from "react"
import Home from "./pages/Home/Home.js"
import MemeGenerator from "./pages/projects/meme-generator/MemeGenerator"
// import BitcoinTester from "./pages/projects/bitcoin-tester/BitcoinTester";
// import CryptoCharts from "./pages/projects/crypto-charts/CryptoCharts"
// import Mtg from "./pages/projects/mtg/Mtg"
// import { Lol } from "./pages/projects/lol/Lol"
// import { LolChampions } from "./pages/projects/lol/LolChampions.js";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import { ChatGpt } from "./pages/projects/chatgpt/ChatGpt.jsx";
import "./styles.css"
// import { LolAccountScraper } from "./pages/projects/lol/LolAccountScraper.js";
import { Calculator } from "./pages/projects/calculator/Calculator.jsx";
import HomeNavbar from "./components/HomeNavbar/HomeNavbar.js";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  return (
    <div>
      <Router>
        <HomeNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/meme-generator" element={<MemeGenerator />} />
          {/* <Route exact path="/projects/bitcoin-tester" element={<BitcoinTester />}/> */}
          {/* <Route path="/projects/crypto-charts" element={<CryptoCharts />}/> */}
          {/* <Route path="/projects/mtg" element={<Mtg />}/> */}
          {/* <Route exact path="/projects/lolaccount" element={<LolAccountScraper />}/> */}
          {/* <Route path="/projects/lol" element={<Lol />}/> */}
          {/* <Route path="/projects/lol/champions/*" element={<LolChampions />}/> */}
          {/* <Route path="/projects/chatgpt" element={<ChatGpt />}/> */}
          <Route path="/projects/calculator" element={<Calculator />} />
        </Routes>
      </Router>
    </div>
  )
}