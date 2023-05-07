import Axios from "axios";
import React, { useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ConfirmationFormCode.css";
import SnackBar from "../SnackBar/SnackBar";

const ConfirmationFormCode = ({ open, openn, opennn, onClose }) => {
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [membre, setMembre] = useState({
    code: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMembre({ ...membre, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (membre.code) {
      const newCode = { ...membre };
      if (
        membre.code.length === 1 ||
        membre.code.length === 2 ||
        membre.code.length === 3 ||
        membre.code.length === 4
      ) {
        const newCode = { ...membre };
        Axios.post("http://localhost:3001/api/AddMembreToGroup", {
          confirmCode: newCode.code,
        })
          .then((response) => {
            if (response.data.failmessage === "user doesn't exist") {
              setType("fail");
              setMessage(response.data.failmessage);
              snackBarRef.current.show();
            } else {
              if (open && opennn) {
                setType("success");
                setMessage("Wait a few seconds");
                snackBarRef.current.show();
                setTimeout(() => {
                  navigate("AddMembreToGroup", { state: response.data[0] });
                }, 2000);
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setMembre({ code: "" });
      } else {
        Axios.post("http://localhost:3001/api/ConfirmationCode", {
          confirmCode: newCode.code,
        })
          .then((response) => {
            if (response.data.failmessage === "user doesn't exist") {
              setType("fail");
              setMessage(response.data.failmessage);
              snackBarRef.current.show();
            } else {
              if (open && openn) {
                setType("success");
                setMessage("Wait a few seconds");
                snackBarRef.current.show();
                setTimeout(() => {
                  navigate("AddEmployee", { state: response.data[0] });
                }, 2000);
              } else {
                setType("success");
                setMessage("Wait a few seconds");
                snackBarRef.current.show();
                setTimeout(() => {
                  navigate("AddMembre", { state: response.data[0] });
                }, 2000);
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setMembre({ code: "" });
      }
    } else {
      setType("wait");
      setMessage("Please, Insert confirmation code!");
      snackBarRef.current.show();
    }
  };

  const navigate = useNavigate();
  if (!open) return null;
  return (
    <motion.div
      className="app__confirmationcode-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="app__confirmationcode-content">
        <div className="app__confirmationcode_content-header">
          <h3>ENTER THE CONFIRMATION CODE</h3>
          <AiOutlineClose className="close--btn" onClick={onClose} />
        </div>
        <form>
          <div className="app__confirmationcode-col">
            <input
              type="text"
              placeholder="confirmation code"
              name="code"
              value={membre.code}
              onChange={handleChange}
            />
            <h5
              style={{ color: "red", marginLeft: "100px", marginTop: "15px" }}
            ></h5>
          </div>
          <div className="btn--container">
            <button
              type="Submit"
              className="confirm--btn"
              onClick={handleSubmit}
            >
              GO
            </button>
          </div>
        </form>
      </div>
      <SnackBar message={message} type={type} ref={snackBarRef} />
    </motion.div>
  );
};

export default ConfirmationFormCode;
