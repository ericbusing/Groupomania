import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navigation.sass";

const Navigation = () => {
  const logout = () => {
    localStorage.removeItem("JWT");
    window.location.reload();
  };

  return (
    <div className="navbar-home">
      <h1>Groupomania</h1>
      <ul className="nav-menu">
        <NavLink to="/profil" style={{ textDecoration: "none" }}>
          <li className="nav-list">Profil</li>
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

export default Navigation;
