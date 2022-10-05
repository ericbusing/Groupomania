import NavigationProfil from "../components/NavigationProfil";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAllPosts } from "../utils/path";

const Profil = (props) => {
  const [isLoad, setIsLoad] = useState(true);
  const [posts, setPosts] = useState([]);
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

  return (
    <div>
      <NavigationProfil />
      {posts.map((post, i) => (
        <Post key={i} post={post} auth={auth} setIsLoad={setIsLoad} />
      ))}
    </div>
  );
};

export default Profil;
