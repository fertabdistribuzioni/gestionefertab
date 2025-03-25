// import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import HeaderBar from "./components/HeaderBar.jsx";
// import AggiungiProdotto from "./AggiungiProdotto.jsx";
// import EliminaProdotto from "./EliminaProdotto.jsx";

// const App = () => {
//   return (
//     <Router>
//       <div id="pageContent">
//         <HeaderBar />
//         <Routes>
//           <Route path="/" element={<Navigate to="/aggiungi-prodotto" />} />
//           <Route path="/aggiungi-prodotto" element={<AggiungiProdotto />} />
//           <Route path="/elimina-prodotto" element={<EliminaProdotto />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import HeaderBar from "./components/HeaderBar.jsx";
import AggiungiProdotto from "./AggiungiProdotto.jsx";
import EliminaProdotto from "./EliminaProdotto.jsx";
import Login from "./LoginPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div id="pageContent">
        {isAuthenticated && <HeaderBar />}
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/aggiungi-prodotto" : "/login"} />} />
          <Route path="/aggiungi-prodotto" element={<PrivateRoute isAuthenticated={isAuthenticated}><AggiungiProdotto /></PrivateRoute>} />
          <Route path="/elimina-prodotto" element={<PrivateRoute isAuthenticated={isAuthenticated}><EliminaProdotto /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
