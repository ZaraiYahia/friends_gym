import React, { useEffect, useState, useRef } from "react";
import ConfirmationFormCode from "../Confirmation/ConfirmationFormCode";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RiUserSearchFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import EditFormMembre from "../EditFormMembre/EditFormMembre";
import Axios from "axios";
import "./Membre.css";
import AllMembreTabel from "./AllMembreTabel";
import Switch from "../Switch/Switch";
import SnackBar from "../SnackBar/SnackBar";

const Membree = () => {
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [qe, setQe] = useState("");
  const Keys = ["first_name", "last_name", "birth_date"];
  const [isOpen, setIsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [update, setUpdate] = useState({
    id: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    gender: "",
    emailaddress: "",
    password: "",
    address: "",
    username: "",
    subscription: "",
    cancel: "",
    typeOfTraining: "",
    groupSession: "",
  });
  const [adherent, setAdherent] = useState([]);
  const [filtredAdherent, setFiltreddherent] = useState([]);

  const changeStateOpen = () => {
    setIsOpen(() => setIsOpen(false));
    setFormOpen(() => setFormOpen(false));
  };
  const changeFormState = (user) => {
    setFormOpen(() => setFormOpen(true));
    setUpdate(user);
  };
  const selectDeleteUser = async (user) => {
    await Axios.delete(
      `http://localhost:3001/api/DeleteMembre/${user.id}`
    ).then((response) => {
      if (response.data.affectedRows === 1) {
        setType("success");
        setMessage("Adherent has been deleted");
        snackBarRef.current.show();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setType("fail");
        setMessage("something went wrong,try again");
        snackBarRef.current.show();
      }
    });
  };

  // filtre the array

  const isPass = (user) => {
    const dateTo = user.cancel_date;
    const currentDate = [
      new Date().getDate(),
      new Date().getMonth() + 1,
      new Date().getFullYear(),
    ].join("/");

    const dT = dateTo.split("-");
    const dC = currentDate.split("/");

    const to = new Date(dT[0], parseInt(dT[1]) - 1, dT[2]);
    const check = new Date(dC[2], parseInt(dC[1]) - 1, dC[0]);

    if (check > to) {
      return user;
    }
  };

  const handleIsPass = () => {
    if (!isToggled) {
      const adherentFilter = adherent.filter(isPass);
      setIsToggled(!isToggled);
      if (adherentFilter.length > 0) {
        setFiltreddherent(adherentFilter);
      } else {
        setType("nothing");
        setMessage("nothing was found !");
        snackBarRef.current.show();
        setFiltreddherent(adherent);
      }
    } else {
      setFiltreddherent(adherent);
      setIsToggled(!isToggled);
    }
  };

  const searchAll = (adherent) => {
    return adherent.filter((row) =>
      Keys.some((key) => row[key].toLowerCase().includes(qe))
    );
  };

  useEffect(() => {
    const abortCont = new AbortController();
    Axios.get("http://localhost:3001/api/getAdherents", {
      signal: abortCont.signal,
    }).then((response) => {
      setAdherent(response.data);
      setFiltreddherent(response.data);
    });
    return () => abortCont.abort();
  }, []);

  return (
    <motion.div
      className="app__membre-container"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.4 } }}
    >
      <div className="app__membre-content">
        <div className="app__membre_content-header">
          <label htmlFor="Membre" className="app__membre_content_header-lab">
            Membres who have pass the dues
          </label>
          <Switch isToggled={isToggled} onToggle={handleIsPass} />
        </div>
        <SnackBar message={message} type={type} ref={snackBarRef} />
        <EditFormMembre
          open={formOpen}
          Data={update}
          onClose={changeStateOpen}
        />
      </div>
      <div className="app__allmembre">
        <div className="app__allmembre_content-header">
          <label
            htmlFor="All-Membre"
            className="app__allmembre_content_header-lab"
          >
            All Membre
          </label>
          <input
            type="text"
            id="All-Membre"
            placeholder="Membre_Id"
            name="qe"
            onChange={(e) => setQe(e.target.value)}
          ></input>
          <RiUserSearchFill className="style--svg" />
        </div>
        <AllMembreTabel
          Data={searchAll(filtredAdherent)}
          onSelect={changeFormState}
          onDelete={selectDeleteUser}
        />
      </div>
      <div className="app__addmembre_content-header">
        <label
          htmlFor="add-membre"
          className="app__addmembre_content_header-lab"
        >
          Add a new Membre(confirmation)
        </label>
        <button id="add-membre-btn" onClick={() => setIsOpen(true)}>
          <FaUserPlus className="style__svg" />
        </button>
        <ConfirmationFormCode open={isOpen} onClose={changeStateOpen} />
      </div>
    </motion.div>
  );
};

export default Membree;
