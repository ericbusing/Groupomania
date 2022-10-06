import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Post from "../components/Post";
import "../styles/Home.sass";
import { getPost } from "../utils/path";
import axios from "axios";
import CreatePost from "../components/CreatePost";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const { auth } = props;

  const handleToggleCreate = () => {
    setShowCreate(!showCreate);
  };

  useEffect(() => {
    if (isLoad) {
      axios
        .get(getPost, {
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
    <div className="home">
      <Navigation />
      <button type="button" onClick={handleToggleCreate}>
        Créer un post
      </button>
      <CreatePost
        auth={auth}
        setIsLoad={setIsLoad}
        show={showCreate}
        close={handleToggleCreate}
      />
      {posts.map((post, i) => (
        <Post
          key={i}
          post={post}
          auth={auth}
          setIsLoad={setIsLoad}
          isLoad={isLoad}
        />
      ))}
    </div>
  );
};

export default Home;
