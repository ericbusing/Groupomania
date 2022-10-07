import NavigationProfil from "../components/NavigationProfil";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllPosts, getOneUser } from "../utils/path";
import "../styles/Profil.sass";

const Profil = (props) => {
  const [isLoad, setIsLoad] = useState(true);
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState();
  const { auth } = props;

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

  // axios.put();

  return (
    <div className="home">
      <NavigationProfil />
      <div className="presentation">
        <h2>{auth.pseudo}</h2>
        <input
          type="texte"
          className="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></input>
        <input
          type="submit"
          name="submit-bio"
          id="submit-bio"
          className="submit-bio"
          placeholder="Envoyer la bio"
        />
      </div>

      {posts.map((post, i) => (
        <Post key={i} post={post} auth={auth} setIsLoad={setIsLoad} />
      ))}
    </div>
  );
};

export default Profil;
