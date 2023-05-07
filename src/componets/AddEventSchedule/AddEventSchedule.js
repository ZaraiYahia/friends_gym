import React, { useState, useEffect, useRef } from "react";
import AddEventContent from "./AddEventContent";
import Axios from "axios";
import { motion } from "framer-motion";
import "./AddEventSchedule.css";
import SnackBar from "../SnackBar/SnackBar";

const AddEventSchedule = ({ open, onClose }) => {
  const [groupes, setGroupes] = useState([]);
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const [event, setEvent] = useState({
    title: "",
    startDate: "",
    endDate: "",
    eventSite: "",
    groupId: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEvent({ ...event, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (event.title && event.startDate && event.endDate) {
      const newEvent = {
        ...event,
        locals: 1,
      };
      Axios.post("http://localhost:3001/api/AddEvent", {
        title: newEvent.title,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate,
        eventSite: newEvent.eventSite,
        groupId: newEvent.groupId,
        locals: newEvent.locals,
      })
        .then((response) => {
          if (response.data.affectedRows === 1) {
            setType("success");
            setMessage("Session has been created");
            snackBarRef.current.show();
          } else {
            setType("fail");
            setMessage("something went wrong,try again");
            snackBarRef.current.show();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setEvent({
        title: "",
        startDate: "",
        endDate: "",
        eventSite: "",
        groupId: "",
      });
    }
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/Allgroupes").then((response) => {
      setGroupes(response.data);
    });
  }, []);

  const ComponetDisplay = () => {
    if (page === 0) {
      return (
        <AddEventContent
          Data={event}
          groupes={groupes}
          onChange={handleChange}
          onClose={onClose}
        />
      );
    }
  };
  if (!open) return null;
  return (
    <motion.div
      className="app__addevent-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="app__addevent-content">
        <div className="app__addevent-compenent">{ComponetDisplay()}</div>
        <div className="app__addevent-footer">
          <button className="style-btn" onClick={handleSubmit}>
            Edit
          </button>
          <SnackBar message={message} type={type} ref={snackBarRef} />
        </div>
      </div>
    </motion.div>
  );
};

export default AddEventSchedule;
