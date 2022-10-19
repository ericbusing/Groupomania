import React, { useState } from "react";
import axios from "axios";
import { login } from "../../utils/path.js";
import { Link } from "react-router-dom";
import "../../styles/SignIn.sass";

const SignInForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setConnected } = props;

  const handleLogin = (e) => {
    e.preventDefault();

    const profile = {
      email: email,
      password: password,
    };

    axios
      .post(login, profile)
      .then((res) => {
        setConnected(res.data);
        localStorage.setItem("JWT", res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-form">
      <img src="../img/icon-left-font.png" alt="logo groupomania" />
      <form
        action=""
        onSubmit={(e) => handleLogin(e)}
        id="sign-up-form"
        className="login-input"
      >
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="email error"></div>
        <br />
        <label htmlFor="password">Mot de passe</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          value={password}
        />
        <div className="password error"></div>
        <br />
        <input type="submit" value="Se connecter" className="submit-input" />
      </form>
      <Link
        to="/register"
        style={{ textDecoration: "none", height: "max-content" }}
      >
        <p>S'inscire</p>
      </Link>
    </div>
  );
};

export default SignInForm;
