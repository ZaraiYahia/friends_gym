import React, { useEffect, useRef, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import "../Registre/Registre.css";
import Axios from "axios";
import QrCode from "../QrCode/QrCode";
import QRCode from "qrcode";
import SnackBar from "../SnackBar/SnackBar";

const Registre = () => {
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [code, setCode] = useState("");
  const [person, setPerson] = useState({
    emailaddress: "",
    password: "",
    gender: "",
    birthdate: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
    address: "",
    username: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  

  const userExist = (user) => {
    const userInserted = person.username.toLowerCase();
    const userExisted = user.userName.toLowerCase();
    if (userInserted === userExisted) {
      return true;
    } else {
      return false;
    }
  };
  const result = users.filter(userExist);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      person.emailaddress &&
      person.password &&
      person.gender &&
      person.birthdate &&
      person.firstname &&
      person.lastname &&
      person.phonenumber &&
      person.address &&
      result.length <= 0
    ) {
      const newPerson = {
        ...person,
        id: new Date().getTime().toString(),
        registreDate: Date(),
      };
      setCode(newPerson.id);
      Axios.post("http://localhost:3001/api/Registre", {
        firstName: newPerson.firstname,
        lastName: newPerson.lastname,
        birthDate: newPerson.birthdate,
        sex: newPerson.gender,
        address: newPerson.address,
        mailAddress: newPerson.emailaddress,
        confirmCode: newPerson.id,
        password: newPerson.password,
        registreDate: newPerson.registreDate,
        userName: newPerson.username,
        phone: newPerson.phonenumber,
      }).then((response) => {
        if (response.data.affectedRows === 1) {
          setType("success");
          setMessage("Done,Your form has been submited");
          snackBarRef.current.show();
          setIsOpen(true);
        } else {
          setType("fail");
          setMessage(response.data.err);
          snackBarRef.current.show();
        }
      });
      setPerson({
        emailaddress: "",
        password: "",
        gender: "",
        birthdate: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
        address: "",
        username: "",
      });
    }
    if (result.length > 0) {
      setType("almost");
      setMessage("Username already exists, change it");
      snackBarRef.current.show();
    } else {
      setType("wait");
      setMessage("Please, You must insert all info");
      snackBarRef.current.show();
    }
  };

  const [passwordEye, setPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  const changeStateOpen = () => {
    setIsOpen(() => setIsOpen(false));
  };
  useEffect(() => {
    if (code.length > 0) {
      QRCode.toDataURL(code)
        .then((response) => {
          setImageUrl(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [code]);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getUsers").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <motion.div
      className="app__registre-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      <div className="reg-container">
        <div className="reg-content">
          <header>
            <h3>REGISTER TO FRIENDS GYM</h3>
            <p>
              Sign up and you’ll be able to manage your account, See your
              programme, diet and many more things.
            </p>
          </header>
          <div className="form">
            <form>
              <div className="reg-group">
                <label htmlFor="email-address">Email address:</label>
                <input
                  type="email"
                  className="reg-control"
                  id="email-address"
                  placeholder="Enter email"
                  name="emailaddress"
                  value={person.emailaddress}
                  onChange={handleChange}
                />
                <small id="emailHelp" className="reg-text">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="reg-group">
                <label htmlFor="username">user name :</label>
                <input
                  type="text"
                  id="username"
                  className="reg-control"
                  placeholder="user name"
                  name="username"
                  value={person.username}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-group eyepassword">
                <label htmlFor="password">Password:</label>
                <input
                  type={passwordEye === false ? "password" : "text"}
                  id="password"
                  className="reg-control"
                  placeholder="Password"
                  name="password"
                  value={person.password}
                  onChange={handleChange}
                />
                <div className="showandhide">
                  {passwordEye === false ? (
                    <AiFillEyeInvisible onClick={handlePasswordClick} />
                  ) : (
                    <AiFillEye onClick={handlePasswordClick} />
                  )}
                </div>
              </div>
              <div className="reg-group">
                <label htmlFor="gender">gender:</label>
                <select
                  className="reg-control"
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                >
                  <option value="">gender</option>

                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="reg-group">
                <label htmlFor="birth-date">birth date:</label>
                <input
                  type="date"
                  id="birth-date"
                  className="reg-control"
                  name="birthdate"
                  value={person.birthdate}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-group">
                <label htmlFor="first-name">first name:</label>
                <input
                  type="text"
                  id="first-name"
                  className="reg-control"
                  placeholder="first name"
                  name="firstname"
                  value={person.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-group">
                <label htmlFor="last-name">last name</label>
                <input
                  type="text"
                  id="last-name"
                  className="reg-control"
                  placeholder="last name"
                  name="lastname"
                  value={person.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-group">
                <label htmlFor="phone-number">phone number:</label>
                <input
                  type="telephone"
                  id="phone-number"
                  className="reg-control"
                  placeholder="phone number"
                  name="phonenumber"
                  value={person.phonenumber}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-group">
                <label htmlFor="address">address:</label>
                <input
                  type="text"
                  id="address"
                  className="reg-control"
                  placeholder="address"
                  name="address"
                  value={person.address}
                  onChange={handleChange}
                />
              </div>
              <p>
                when you registre ,you will receive a code to confirm your
                registre in our gym,that code will be valid for 3 days.
              </p>
              <button
                type="submit"
                className="registre-btn"
                onClick={handleSubmit}
              >
                registre
              </button>

              <SnackBar message={message} type={type} ref={snackBarRef} />
            </form>
            <QrCode
              open={isOpen}
              Qrcode={imageUrl}
              code={code}
              onClose={changeStateOpen}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Registre;
