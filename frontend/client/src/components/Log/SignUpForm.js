import { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import { register } from "../../utils/path.js";
import { Link } from "react-router-dom";
import "../../styles/SignIn.sass";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    const newProfile = {
      pseudo: pseudo,
      email: email,
      password: password,
    };

    axios
      .post(register, newProfile)
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          pseudoError.innerHTML = res.data.errors.pseudo;
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          setFormSubmit(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter.
          </h4>
        </>
      ) : (
        <div className="login-form">
          <img src="../img/icon-left-font.png" alt="logo groupomania" />
          <form
            action=""
            onSubmit={(e) => handleRegister(e)}
            id="sign-up-form"
            className="login-input"
          >
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
              required
            />
            <div className="pseudo error"></div>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
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
              value={password}
              required
            />
            <br />
            <br />
            <input
              type="submit"
              value="Valider inscription"
              className="submit-input"
            />
          </form>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Se connecter</p>
          </Link>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
