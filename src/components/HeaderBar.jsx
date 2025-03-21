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
