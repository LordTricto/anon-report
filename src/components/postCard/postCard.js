import "./style.css";

import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiInstance } from "../../utils/utils";
import { faImage } from "@fortawesome/free-regular-svg-icons";

// const FILE_SIZE = 160 * 1024;
// const SUPPORTED_FORMATS = [
//   "image/jpg",
//   "image/jpeg",
//   "image/gif",
//   "image/png",
//   "video/mp4",
//   "audio/mp3",
// ];

const PostCard = () => {
  const [title, setTitle] = useState([]);
  const [file, setFile] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [happening, setHappening] = useState();
  const [by, setBy] = useState();
  const [id, setId] = useState("");
  // let time = new Date().toLocaleTimeString();
  // const [displayTime, setDisplayTime] = useState(time);

  // const updateTime = () => {
  //   time = new Date().toLocaleTimeString();
  //   setDisplayTime(time);
  // };

  // setInterval(updateTime, 1000);

  useEffect(() => {
    if (id === "") return;
    apiInstance
      .post(`/posts/verify/${id}`, {
        input: location,
        input1: happening,
        input2: by,
      })
      .then((resp) => {})
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("post", title);
    data.append("media", file);
    data.append("description", description);

    async function uploadData() {
      apiInstance
        .post(`/posts`, data)
        .then((resp) => {
          alert(resp.data.message);
          setId(resp.data.data.id);
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
    uploadData();
  };
  return (
    <>
      <div className="post__card">
        <form onSubmit={onSubmit} className="post__form">
          <div className="post__header">
            <span>Report A Case</span>
            {/* <span className="post__date">{displayTime}</span> */}
          </div>
          <div className="post__details">
            <div className="post__profile">
              <div className="post__image">A</div>
            </div>
            <div className="post__inputs">
              <div>
                <span>Title</span>
                <textarea
                  className="post__textarea Top"
                  name="reportTitle"
                  onChange={(event) => {
                    const { value } = event.target;
                    setTitle(value);
                  }}
                ></textarea>
              </div>
              <div>
                <span>Description</span>
                <textarea
                  className="post__textarea Bottom"
                  name="reportDescription"
                  onChange={(event) => {
                    const { value } = event.target;
                    setDescription(value);
                  }}
                ></textarea>
              </div>
              <div>
                <span>Loction</span>
                <textarea
                  className="post__textarea Top"
                  name="reportDescription"
                  onChange={(event) => {
                    const { value } = event.target;
                    setLocation(value);
                  }}
                ></textarea>
              </div>
              <div>
                <span>Is it happening right now ?</span>
                <textarea
                  className="post__textarea Top"
                  name="reportDescription"
                  onChange={(event) => {
                    const { value } = event.target;
                    setHappening(value);
                  }}
                ></textarea>
              </div>
              <div>
                <span>Did you record the video or take the picture ?</span>
                <textarea
                  className="post__textarea Top"
                  name="reportDescription"
                  onChange={(event) => {
                    const { value } = event.target;
                    setBy(value);
                  }}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="post__bottom">
            <div className="post__button">
              <button type="submit">Post Report</button>
            </div>

            <div className="post__img">
              <FontAwesomeIcon icon={faImage} />
              <input
                type="file"
                id="file"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setFile(file);
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostCard;
