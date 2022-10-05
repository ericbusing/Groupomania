import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navigation.sass";
import { useNavigate } from "react-router-dom";

const NavigationProfil = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("JWT");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar-home">
      <h1>Groupomania</h1>
      <ul className="nav-menu">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <li className="nav-list">Accueil</li>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }}>
          <li className="nav-list" onClick={() => logout()}>
            Déconnection
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default NavigationProfil;
