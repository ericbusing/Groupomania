import { useEffect, useState } from "react";
import Home from "../src/pages/Home";
import SignIn from "./components/Auth/SignInForm";
import SignUp from "./components/Auth/SignUpForm";
import { getMe } from "./utils/path";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Profil from "../src/pages/Profil";

const App = () => {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const getAuth = localStorage.getItem("JWT");
    if (!connected && getAuth) {
      axios
        .get(getMe, {
          headers: {
            Authorization: `Bearer ${getAuth}`,
          },
        })
        .then(function (res) {
          setConnected(res.data);
        })
        .catch(function (error) {
          localStorage.removeItem("JWT");
        });
    }
  }, [connected]);
  return (
    <div className="app">
      {!connected ? (
        <Routes>
          <Route
            exact
            path="/"
            element={<SignIn setConnected={setConnected} />}
          />
          <Route
            path="/register"
            element={<SignUp setConnected={setConnected} />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home auth={connected} />} />
          <Route path="/profil" element={<Profil auth={connected} />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
