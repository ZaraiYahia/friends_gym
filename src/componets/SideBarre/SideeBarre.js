import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Data from "../SideBarre/SideData";
import Axios from "axios";
import "./SideBarre.css";
import SnackBar from "../SnackBar/SnackBar";

const SideeBarre = ({ ina, changeState, userInfo }) => {
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const imageRef = useRef(null);
  const uploadBtnRef = useRef(null);
  const [image, setImage] = useState({});
  const navigate = useNavigate();
  const handleLogOut = () => {
    Axios.post("http://localhost:3001/api/Logout/userlogout").then(
      (response) => {
        navigate(response.data);
      }
    );
  };

  const handleMouseEnter = () => {
    uploadBtnRef.current.style.display = "block";
  };

  const handleMouseLeave = () => {
    uploadBtnRef.current.style.display = "none";
  };

  const handleUploadImage = (e) => {
    e.preventDefault();
    const newImage = image;
    const userId = userInfo[0].user_id;
    console.log(userId);
    if (image.name) {
      Axios.post(
        "http://localhost:3001/api/Login/UserImage",
        {
          userId: userId,
          imageUploaded: newImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((response) => {
        if (response.data.affectedRows === 1) {
          setType("success");
          setMessage("Done,Your profil photo updated");
          snackBarRef.current.show();
        } else {
          setType("fail");
          setMessage("something went wrong,try again");
          snackBarRef.current.show();
        }
      });
    } else {
      setType("wait");
      setMessage("Please, You must upload an image");
      snackBarRef.current.show();
    }
  };

  return (
    <div className={`app__sidebarre ${ina ? "inactive" : ""}`}>
      <div className="app__sidebarre-user">
        <div className="app__toggle-menu-btn">
          {ina ? (
            <i
              className="bi bi-arrow-right-circle-fill"
              onClick={() => changeState()}
            ></i>
          ) : (
            <i
              className="bi bi-arrow-left-circle-fill"
              onClick={() => changeState()}
            ></i>
          )}
        </div>
        {userInfo.map((user) => {
          const { user_id, profil_picture } = user;
          return (
            <div
              className="app__sidebarre_user-img"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              key={user_id}
            >
              {profil_picture ? (
                <img
                  src={require(`../../../server/Routes/upload/${profil_picture}`)}
                  id="app__sidebarre_user-photo"
                />
              ) : (
                <img
                  src={require("./img2.png")}
                  id="app__sidebarre_user-photo"
                />
              )}
              <input
                type="file"
                id="app__sidebarre_user-file"
                accept="imag/*"
                name="image"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              ></input>
              <label
                htmlFor="app__sidebarre_user-file"
                id="app__sidebarre_user-uploadBtn"
                ref={uploadBtnRef}
              >
                <MdOutlineAddAPhoto
                  style={{ fontSize: "25px", marginTop: "12px" }}
                />
              </label>
            </div>
          );
        })}

        <div className="app__sidebarre_user-info">
          {userInfo.map((user) => {
            const {
              user_id,
              first_name,
              last_name,
              mail_address,
              designation,
            } = user;
            return (
              <div key={user_id}>
                <h2>{last_name + " " + first_name}</h2>
                <p>{mail_address}</p>
                <p>{designation}</p>
              </div>
            );
          })}
          <div className="app__sidebarre_user-btn">
            <button onClick={handleLogOut}>
              <AiOutlineLogout style={{ fontSize: "18px", marginTop: "5px" }} />
            </button>
            <button
              type="submit"
              style={{ width: "0", margin: "0" }}
              onClick={handleUploadImage}
            >
              <FaCloudUploadAlt
                style={{
                  fontSize: "18px",
                  color: "white",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
              />
              <SnackBar message={message} type={type} ref={snackBarRef} />
            </button>
          </div>
        </div>
      </div>
      <div className="app__sidebarre-content">
        <ul tabIndex="0">
          {Data.map((data) => {
            const { id, url, text, icon, method } = data;
            return (
              <li key={id} className="app__component-firstrow" tabIndex="0">
                {/*<a href={url}>*/}
                <Link to={url} tabIndex="0" onClick={method}>
                  {icon}
                  <span>{text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideeBarre;
