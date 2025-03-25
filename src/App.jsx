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
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import HeaderBar from "./components/HeaderBar.jsx";
import AggiungiProdotto from "./AggiungiProdotto.jsx";
import EliminaProdotto from "./EliminaProdotto.jsx";
import Login from "./Login"; // Aggiungi il componente di login

const auth = getAuth();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica lo stato di autenticazione dell'utente
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // L'utente è autenticato
      } else {
        setIsAuthenticated(false); // L'utente non è autenticato
      }
    });

    // Aggiungi un listener per l'evento 'beforeunload' per fare il logout quando la scheda o il browser viene chiuso
    const handleBeforeUnload = () => {
      if (isAuthenticated) {
        signOut(auth); // Esegui il logout
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unsubscribe(); // Pulisci l'ascoltatore di Firebase
      window.removeEventListener("beforeunload", handleBeforeUnload); // Pulisci il listener dell'evento 'beforeunload'
    };
  }, [isAuthenticated]);

  return (
    <Router>
      <div id="pageContent">
        <HeaderBar />
        <Routes>
          {/* Se l'utente non è autenticato, reindirizza alla pagina di login */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/aggiungi-prodotto" /> : <Login />} />
          {/* Le altre rotte sono protette e richiedono l'autenticazione */}
          <Route path="/aggiungi-prodotto" element={isAuthenticated ? <AggiungiProdotto /> : <Navigate to="/" />} />
          <Route path="/elimina-prodotto" element={isAuthenticated ? <EliminaProdotto /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


