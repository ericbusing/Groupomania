import { useState } from "react";
import FormData from "form-data";
import { createPost } from "../utils/path";
import axios from "axios";

const CreatePost = (props) => {
  const [message, setMessage] = useState();
  const [images, setImages] = useState(false);
  const { auth, setIsLoad } = props;

  const send = (e) => {
    e.preventDefault();
    if (images) {
      const data = new FormData();
      data.append(
        "images",
        e.target.image.files[0],
        e.target.image.files[0].name
      );
      data.set("message", message);
      data.set("userId", auth.userId);
      axios
        .post(createPost, data, {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(function (res) {
          setIsLoad(true);
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      const data = new FormData();
      data.set("message", message);
      data.set("userId", auth.userId);
      axios
        .post(createPost, data, {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(function (res) {
          setIsLoad(true);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  return (
    <div className="createPost">
      <form className="post-form" onSubmit={(e) => send(e)}>
        <input
          type="text"
          id="post"
          className="post-input"
          placeholder="Commence ton post"
          // value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="image-submit">
          <input
            type="file"
            name="image"
            id="image"
            className="post-image"
            onChange={(e) => setImages(true)}
          />
          <input
            type="submit"
            name="submit"
            id="submit"
            className="post-submit"
            placeholder="Envoyer"
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
