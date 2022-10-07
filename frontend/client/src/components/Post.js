import { useEffect, useState } from "react";
import "../styles/Post.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPencil,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import FormData from "form-data";
import axios from "axios";
import { modifyPost, deletePost } from "../utils/path";

const Post = (props) => {
  const { post, auth, setIsLoad, isLoad } = props;
  const [modify, setModify] = useState(false);
  const [changePicture, setChangePicture] = useState(false);
  const [message, setMessage] = useState(post.message);
  const [images, setImages] = useState(post.picture);

  const day = new Date(post.date);
  const finalDay = day.getDate();

  const month = new Date(post.date);
  const finalMonth = month.getMonth() + 1;

  const year = new Date(post.date);
  const finalYear = year.getFullYear();

  const updatePost = (e) => {
    e.preventDefault();
    if (changePicture) {
      const data = new FormData();
      data.append(
        "images",
        e.target.image.files[0],
        e.target.image.files[0].name
      );
      data.set("message", message);
      data.set("userId", auth.userId);
      axios
        .put(modifyPost + post._id, data, {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(function (res) {
          setIsLoad(true);
          setModify(false);
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      axios
        .put(
          modifyPost + post._id,
          {
            message: message,
            userId: auth.userId,
          },
          {
            headers: {
              // "Content-Type": `multipart/form-data`,
              Authorization: `Bearer ${auth.token}`,
            },
          }
        )
        .then(function (res) {
          setIsLoad(true);
          setModify(false);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (isLoad) {
      setMessage(post.message);
    }
  }, [isLoad, post.message]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const erasePost = () => {
    axios
      .delete(deletePost + post._id, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then(function (res) {
        setIsLoad(true);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="post">
      {(auth.userId === post.userId || auth.admin) && (
        <div className="trashEdit">
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={(e) => erasePost(e)}
            className="trash"
          />
          <FontAwesomeIcon
            icon={faPencil}
            onClick={() => {
              setModify(!modify);
              setIsLoad(true);
            }}
            className="edit"
          />
        </div>
      )}
      {!modify ? (
        <>
          <div className="pseudo">{post.pseudo}</div>
          <div>
            {finalDay}/{finalMonth}/{finalYear}
          </div>
          <div className="message">{post.message}</div>
          <img src={post.picture} alt={post.id} />
        </>
      ) : (
        <>
          <form className="post-form" onSubmit={(e) => updatePost(e)}>
            <input
              type="text"
              id="post"
              className="post-input"
              placeholder="Commence ton post"
              value={message}
              onChange={(e) => handleChange(e)}
            />
            <div className="image">
              <img src={images} alt="" />
            </div>
            <div className="image-submit">
              <input
                type="file"
                name="image"
                id="image"
                className="post-image"
                onChange={(e) => {
                  setImages(URL.createObjectURL(e.target.files[0]));
                  setChangePicture(true);
                }}
              />
              <input
                type="submit"
                name="submit"
                id="submit"
                className="post-submit"
              />
            </div>
          </form>
        </>
      )}
      <div className="likeDislike">
        <FontAwesomeIcon icon={faThumbsUp} className="like" />
        <FontAwesomeIcon icon={faThumbsDown} className="dislike" />
      </div>
    </div>
  );
};

export default Post;
