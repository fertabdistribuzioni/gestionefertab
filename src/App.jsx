import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HeaderBar from "./components/HeaderBar.jsx";
import AggiungiProdotto from "./AggiungiProdotto.jsx";
import EliminaProdotto from "./EliminaProdotto.jsx";

const App = () => {
  return (
    <Router>
      <div id="pageContent">
        <HeaderBar />
        <Routes>
          <Route path="/" element={<Navigate to="/aggiungi-prodotto" />} />
          <Route path="/aggiungi-prodotto" element={<AggiungiProdotto />} />
          <Route path="/elimina-prodotto" element={<EliminaProdotto />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
