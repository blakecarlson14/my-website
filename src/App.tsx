import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ChessPage from "./pages/ChessPage";
import CalculatorPage from "./pages/CalculatorPage";
import MemePage from "./pages/MemePage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="chess" element={<ChessPage />} />
        <Route path="lab/calculator" element={<CalculatorPage />} />
        <Route path="lab/meme-generator" element={<MemePage />} />
        {/* Paths from the old site */}
        <Route path="projects/calculator" element={<Navigate to="/lab/calculator" replace />} />
        <Route path="projects/meme-generator" element={<Navigate to="/lab/meme-generator" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
