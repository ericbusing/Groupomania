import { useEffect, useState } from "react";
import "../styles/Post.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPencil,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import FormData from "form-data";
import axios from "axios";
import { modifyPost, deletePost, likeUnlike } from "../utils/path";

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
  // Permet de modifier un post.
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
          setChangePicture(false);
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
              Authorization: `Bearer ${auth.token}`,
            },
          }
        )
        .then(function (res) {
          setIsLoad(true);
          setModify(false);
          setChangePicture(false);
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
  // Permet de supprimer un post.
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
  // Permet de gerer les likes.
  const like = () => {
    axios
      .post(
        likeUnlike + post._id,
        {
          like: 1,
          userId: auth.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(function (res) {
        setIsLoad(true);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  // Permet de gerer les unlikes.
  const unlike = () => {
    axios
      .post(
        likeUnlike + post._id,
        {
          unlike: 1,
          userId: auth.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(function (res) {
        setIsLoad(true);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="post">
      {!modify ? (
        <>
          <div className="data-post">
            <div className="pseudo">{post.pseudo}</div>
            <div className="date">
              {finalDay}/{finalMonth}/{finalYear}
            </div>
            {(auth.userId === post.userId || auth.admin) && (
              <div className="trashEdit">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={(e) => erasePost(e)}
                  className="trash"
                />
                <FontAwesomeIcon
                  icon={faPencil}
                  className="edit"
                  onClick={() => {
                    setModify(!modify);
                    setIsLoad(true);
                  }}
                />
              </div>
            )}
          </div>
          <div className="text-picture">
            <div className="message">{post.message}</div>
            <img src={post.picture} alt={post.id} />
          </div>
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
      {post.usersLiked.includes(auth.userId) ? (
        <>
          <div className="likeUnlike">
            <FontAwesomeIcon
              icon={faHeart}
              className="unlike"
              onClick={() => unlike()}
            />
          </div>
        </>
      ) : (
        <>
          <div className="likeUnlike">
            <FontAwesomeIcon
              icon={faHeart}
              className="like"
              onClick={() => like()}
            />
          </div>
        </>
      )}
      <h4>{post.likes}</h4>
    </div>
  );
};

export default Post;
