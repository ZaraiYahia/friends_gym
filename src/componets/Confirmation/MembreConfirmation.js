import React, { useEffect, useState, useRef } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./MembreConfirmation.css";
import { motion } from "framer-motion";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SnackBar from "../SnackBar/SnackBar";
const MembreConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [confAdherent, setConfAdherent] = useState(location.state);
  const [groupes, setGroupes] = useState([]);
  const [adherent, setAdherent] = useState({
    idMembre: confAdherent.idMembre,
    id: confAdherent.adherent_id,
    firstname: confAdherent.first_name,
    lastname: confAdherent.last_name,
    birthdate: confAdherent.birth_date,
    gender: confAdherent.gender,
    emailaddress: confAdherent.mail_address,
    password: confAdherent.pass_word,
    address: confAdherent.address,
    username: confAdherent.user_name,
    phonenumber: confAdherent.phone,
    registration: "",
    subscription: "",
    cancel: "",
    typeOfTraining: "",
    groupSession: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAdherent({ ...adherent, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      adherent.firstname &&
      adherent.lastname &&
      adherent.birthdate &&
      adherent.gender &&
      adherent.emailaddress &&
      adherent.password &&
      adherent.address &&
      adherent.username &&
      adherent.phonenumber &&
      adherent.registration &&
      adherent.subscription &&
      adherent.cancel
    ) {
      const newAdherent = {
        ...adherent,
        role: 4,
      };
      Axios.post("http://localhost:3001/api/ConfirmationRegistre", {
        firstName: newAdherent.firstname,
        lastName: newAdherent.lastname,
        birthDate: newAdherent.birthdate,
        gender: newAdherent.gender,
        address: newAdherent.address,
        mailAddress: newAdherent.emailaddress,
        password: newAdherent.password,
        userName: newAdherent.username,
        phone: newAdherent.phonenumber,
        registration: newAdherent.registration,
        subscription: newAdherent.subscription,
        cancel: newAdherent.cancel,
        typeOfTraining: newAdherent.typeOfTraining,
        groupSession: newAdherent.groupSession,
        role: newAdherent.role,
      }).then((response) => {
        if (response.data.affectedRows === 1) {
          setType("success");
          setMessage("Done,Your confirmation has been submited");
          snackBarRef.current.show();
        } else {
          setType("fail");
          setMessage("something went wrong");
          snackBarRef.current.show();
        }
      });
      setAdherent({
        id: "",
        firstname: "",
        lastname: "",
        birthdate: "",
        gender: "",
        emailaddress: "",
        password: "",
        address: "",
        username: "",
        phonenumber: "",
        registration: "",
        subscription: "",
        cancel: "",
        typeOfTraining: "",
        groupSession: "",
      });
      setTimeout(() => {
        navigate("/Login/Admin/Membres");
      }, 3000);
    } else if (adherent.groupSession && adherent.id) {
      const newAdherent = {
        ...adherent,
      };
      Axios.put("http://localhost:3001/api/confirmGroup", {
        id: newAdherent.id,
        groupSession: newAdherent.groupSession,
      }).then((response) => {
        if (response.data.affectedRows === 1) {
          setType("success");
          setMessage("Successfully updated");
          snackBarRef.current.show();
        } else {
          setType("fail");
          setMessage("something went wrong");
          snackBarRef.current.show();
        }
      });
      setAdherent({
        id: "",
        firstname: "",
        lastname: "",
        birthdate: "",
        gender: "",
        emailaddress: "",
        password: "",
        address: "",
        username: "",
        phonenumber: "",
        registration: "",
        subscription: "",
        cancel: "",
        typeOfTraining: "",
        groupSession: "",
      });
      setTimeout(() => {
        navigate("/Login/Admin/Groupes");
      }, 2000);
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
  useEffect(() => {
    const abortCont = new AbortController();
    Axios.get("http://localhost:3001/api/get/Allgroupes", {
      signal: abortCont.signal,
    }).then((response) => {
      setGroupes(response.data);
    });
    return () => abortCont.abort();
  }, []);

  return (
    <motion.div
      className="app__membreconfirm-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="app__membreconfirm-content">
        <div className="app__membreconfirm_content-header">
          <h2>Confirmation form</h2>
          <h5>
            Confirmation ID:{" "}
            <span style={{ color: "blue" }}>
              {adherent.id}
              {adherent.idMembre}
            </span>
          </h5>
        </div>
        <form>
          <div className="app__membreconfirm-row">
            <div className="app__membreconfirm-col">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                placeholder="first_name"
                name="firstname"
                value={adherent.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="app__membreconfirm-col">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                placeholder="last_name"
                name="lastname"
                value={adherent.lastname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="app__membreconfirm-row">
            <div className="app__membreconfirm-col">
              <label htmlFor="birthDate">Birthdate:</label>
              <input
                type="date"
                id="birthDate"
                placeholder="Birthdate"
                name="birthdate"
                value={adherent.birthdate}
                onChange={handleChange}
              />
            </div>
            <div className="app__membreconfirm-col">
              <label htmlFor="gender">gender:</label>
              <select id="gender" name="gender" onChange={handleChange}>
                <option value="">gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
          </div>
          <div className="app__membreconfirm-row">
            <div className="app__membreconfirm-col">
              <label htmlFor="e-mail">E-mail:</label>
              <input
                type="email"
                id="e-mail"
                placeholder="E-mail"
                name="emailaddress"
                value={adherent.emailaddress}
                onChange={handleChange}
              />
            </div>
            <div className="app__membreconfirm-col">
              <label htmlFor="password">Pass Word:</label>
              <input
                type={passwordEye === false ? "password" : "text"}
                id="password"
                placeholder="Password"
                name="password"
                value={adherent.password}
                onChange={handleChange}
              />
              <div className="hideandshow">
                {passwordEye === false ? (
                  <AiFillEyeInvisible onClick={handlePasswordClick} />
                ) : (
                  <AiFillEye onClick={handlePasswordClick} />
                )}
              </div>
            </div>
          </div>
          <div className="app__membreconfirm-row">
            <div className="app__membreconfirm-col">
              <label htmlFor="adresse">Adresse:</label>
              <input
                type="text"
                id="adresse"
                placeholder="adresse"
                name="address"
                value={adherent.address}
                onChange={handleChange}
              />
            </div>
            <div className="app__membreconfirm-col">
              <label htmlFor="userName">User Name:</label>
              <input
                type="text"
                id="userName"
                placeholder="User_name"
                name="username"
                value={adherent.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="app__membreconfirm-row">
            <div className="app__membreconfirm-col">
              <label htmlFor="role">phone number:</label>
              <input
                type="text"
                id="userName"
                placeholder="User_name"
                name="phonenumber"
                value={adherent.phonenumber}
                onChange={handleChange}
              />
            </div>
            <div className="empty"></div>
          </div>
          <div className="app__membreconfirm-row">
            <div className="app__membreconfirm-col">
              <label htmlFor="registration">Registration :</label>
              <input
                type="date"
                id="registration"
                name="registration"
                value={adherent.registration}
                onChange={handleChange}
              />
            </div>
            <div className="empty"></div>
          </div>
          <div className="app__membreconfirm-row">
            <div className="app__membreconfirm-col">
              <label htmlFor="subscription">Subscription :</label>
              <input
                type="date"
                id="subscription"
                name="subscription"
                value={adherent.subscription}
                onChange={handleChange}
              />
            </div>
            <div className="app__membreconfirm-col">
              <label htmlFor="cancel">Cancel :</label>
              <input
                type="date"
                id="cancel"
                name="cancel"
                value={adherent.cancel}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="app__membreconfirm-row">
            <div className="app__membreconfirm-col">
              <label htmlFor="typeoftraining">Type of Training :</label>
              <select
                id="typeoftraining"
                name="typeOfTraining"
                onChange={handleChange}
              >
                <option value="">Type of Training</option>
                <option value="Fitness">Fitness</option>
                <option value="Bodybulding">Bodybulding</option>
                <option value="CrosFit">CrosFit</option>
                <option value="Mix">Mix</option>
              </select>
            </div>

            <div className="app__membreconfirm-col">
              <label htmlFor="groupesession">Group session :</label>
              <select
                id="groupesession"
                name="groupSession"
                onChange={handleChange}
              >
                <option value="">group Name</option>
                {groupes.map((group) => {
                  const { group_id, group_name } = group;
                  return (
                    <option key={group_id} value={group_id}>
                      {group_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="btn-container">
            <button
              type="Submit"
              className="confirm-btn"
              onClick={handleSubmit}
            >
              Confirm
            </button>
            <SnackBar message={message} type={type} ref={snackBarRef} />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default MembreConfirmation;
