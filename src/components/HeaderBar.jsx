<<<<<<< HEAD
import logo from "../assets/logo/FTD_logoBig.svg";
import { NavLink } from "react-router-dom";

function HeaderBar() {
  return (
    <nav>
      <img id="navbarLogo" src={logo} alt="Logo" />
      <div id="menu">
        <NavLink to="/aggiungi-prodotto" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>
          Aggiungi
        </NavLink>
        <NavLink to="/elimina-prodotto" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>
          Elimina
        </NavLink>
      </div>
    </nav>
  );
}

export default HeaderBar;
=======
import logo from "../assets/logo/FTD_logoBig.svg";
import { NavLink } from "react-router-dom";

function HeaderBar() {
  return (
    <nav>
      <img id="navbarLogo" src={logo} alt="Logo" />
      <div id="menu">
        <NavLink to="/aggiungi-prodotto" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>
          Aggiungi
        </NavLink>
        <NavLink to="/elimina-prodotto" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>
          Elimina
        </NavLink>
      </div>
    </nav>
  );
}

export default HeaderBar;
>>>>>>> 7db0200bf0e2d283e2d1d8e37987df224a693fa4
