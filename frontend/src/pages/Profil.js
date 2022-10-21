import NavigationProfil from "../components/NavigationProfil";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllPosts, getOneUser, updateUser } from "../utils/path";
import "../styles/Profil.sass";

const Profil = (props) => {
  const [isLoad, setIsLoad] = useState(true);
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState();
  const [showButton, setShowButton] = useState(false);
  const { auth } = props;

  // Recuperation des posts de l'user.
  useEffect(() => {
    if (isLoad) {
      axios
        .get(getAllPosts, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(function (res) {
          const sort = res.data.reverse();
          setPosts(sort);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    setIsLoad(false);
  }, [isLoad, auth]);
  // Recuperation de la bio de l'user.
  useEffect(() => {
    if (isLoad)
      axios
        .get(getOneUser + auth.userId, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(function (res) {
          setBio(res.data.bio);
        })
        .catch(function (err) {
          console.log(err);
        });
  });
  // Modification de la bio de l'user.
  const data = {
    bio: bio,
  };

  const submitBio = (e) => {
    e.preventDefault();
    axios
      .put(updateUser + auth.userId, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then(function (res) {
        setIsLoad(true);
        setShowButton(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="home">
      <NavigationProfil />
      <div className="profil-container">
        <form className="presentation" onSubmit={(e) => submitBio(e)}>
          <h2>{auth.pseudo}</h2> {/*affichage du pseudo dans la page profil*/}
          <textarea
            type="texte"
            className="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength="500"
            onFocus={() => setShowButton(true)}
            // onBlur={() => setShowButton(false)}
          />
          {showButton && (
            <button
              type="submit"
              name="submit-bio"
              id="submit-bio"
              className="submit-bio"
            >
              Envoyer
            </button>
          )}
        </form>
        <div className="post-profil">
          {/*affichage des posts de l'user*/}
          {posts.map((post, i) => (
            <Post key={i} post={post} auth={auth} setIsLoad={setIsLoad} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profil;
