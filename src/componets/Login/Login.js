import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Axios from "axios";
import "../Login/Login.css";
import SnackBar from "../SnackBar/SnackBar";

const Login = () => {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [userLoger, setUserLoger] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username && user.password) {
      const newUser = {
        ...user,
      };
      Axios.post("http://localhost:3001/api/Login/User", {
        userName: newUser.username,
        passWord: newUser.password,
      }).then((response) => {
        console.log(response);
        if (response.data.almostmessage) {
          setType("wait");
          setMessage(response.data.almostmessage);
          snackBarRef.current.show();
        } else if (response.data.failmessage) {
          setType("fail");
          setMessage(response.data.failmessage);
          snackBarRef.current.show();
        } else if (response.data[0].ROLE === 1) {
          setType("success");
          setMessage("Please, wait a few seconds");
          snackBarRef.current.show();
          setTimeout(() => {
            navigate("/Login/Admin/Membres");
          }, 2000);
        } else if (response.data[0].ROLE === 2) {
          setType("success");
          setMessage("Please, wait a few seconds");
          snackBarRef.current.show();
          setTimeout(() => {
            navigate("/Login/Admin/Membres");
          }, 2000);
        } else if (response.data[0].ROLE === 3) {
          /*navigate("Admin", { state: response.data[0] });*/
        } else if (response.data[0].ROLE === 4) {
          /*navigate("Admin", { state: response.data[0] });*/
        }
      });
      setUser({
        username: "",
        password: "",
        role: "",
      });
    } else {
      setType("wait");
      setMessage("Please, You must insert all info");
      snackBarRef.current.show();
    }
  };
  const handeForgetPass = () => {
    setType("nothing");
    setMessage("Please, Contact Us");
    snackBarRef.current.show();
  };
  const [passwordEye, setPasswordEye] = useState(false);
  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };
  /* useEffect(() => {
    Axios.get("http://localhost:3001/api/getMembre").then((response) => {
      setAdherent(response.data);
    });
  }, []);*/
  return (
    <motion.div
      className="app__login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      <div className="log-container">
        <div className="log-content">
          <header>
            <h3>log into friends gym</h3>
          </header>
          <form>
            <div className="log-group">
              <label htmlFor="username">user name:</label>
              <input
                type="text"
                id="username"
                className="log-control"
                placeholder="user name"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div className="log-group">
              <label htmlFor="password">Password:</label>
              <input
                type={passwordEye === false ? "password" : "text"}
                id="password"
                className="log-control"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <div className="show">
                {passwordEye === false ? (
                  <AiFillEyeInvisible onClick={handlePasswordClick} />
                ) : (
                  <AiFillEye onClick={handlePasswordClick} />
                )}
              </div>
            </div>

            <button type="submit" className="login-btn" onClick={handleSubmit}>
              login
            </button>
            <SnackBar message={message} type={type} ref={snackBarRef} />
            <a href="#" onClick={handeForgetPass}>
              l've forgotten my password
            </a>
            <p>
              New to friends gym?
              <a onClick={() => navigate("/Registre")}>Create an account</a>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
