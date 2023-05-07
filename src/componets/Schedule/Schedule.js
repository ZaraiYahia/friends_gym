import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../Schedule/Schedule.css";
import { Calendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AiOutlinePlus } from "react-icons/ai";
import { momentLocalizer } from "react-big-calendar";
import Axios from "axios";
import AddEventSchedule from "../AddEventSchedule/AddEventSchedule";

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [sessions, setSessions] = useState([]);
  const [localSessions, setLocalSessions] = useState([]);
  const [allLocalSessions, setAllLocalSessions] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const changeStateOpen = () => {
    setIsOpen(() => setIsOpen(false));
  };
  useEffect(() => {
    const abortCont = new AbortController();
    Axios.get("http://localhost:3001/api/get/Sessions", {
      signal: abortCont.signal,
    }).then((response) => {
      setSessions(response.data);
    });
    Axios.get("http://localhost:3001/api/get/AllSessions", {
      signal: abortCont.signal,
    }).then((response) => {
      setLocalSessions(response.data);
    });
    Axios.get("http://localhost:3001/api/get/AllLocalSessions", {
      signal: abortCont.signal,
    }).then((response) => {
      setAllLocalSessions(response.data);
    });
    return () => abortCont.abort();
  }, []);
  useEffect(async () => {
    setAllSessions([...sessions, ...localSessions, ...allLocalSessions]);
  }, [localSessions, sessions, allLocalSessions]);
  useEffect(() => {
    let newEvents = allSessions.map((session) => {
      const {
        session_id,
        group_name,
        designation_cat,
        nombre_place,
        starte_date_h,
        end_date_h,
        title,
        locals,
      } = session;
      if (group_name && locals === 1) {
        return {
          id: session_id,
          title: group_name + "  " + title,
          forStyle: title,
          start: new Date(starte_date_h),
          end: new Date(end_date_h),
        };
      }
      if (group_name === undefined) {
        return {
          id: session_id,
          title: title,
          forStyle: title,
          start: new Date(starte_date_h),
          end: new Date(end_date_h),
        };
      }
      if (designation_cat) {
        return {
          id: session_id,
          title:
            group_name + "-" + designation_cat + "  " + "N|" + nombre_place,
          forStyle: designation_cat,
          start: new Date(starte_date_h),
          end: new Date(end_date_h),
        };
      }
    });
    setEvents(newEvents);
  }, [allSessions]);

  return (
    <motion.div
      className="app__schedule-container"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.4 } }}
    >
      <div className="app__schedule-content">
        <div className="app__schedule-header">
          <h2>Schedule</h2>
          <AiOutlinePlus
            className="addevent-btn"
            onClick={() => setIsOpen(true)}
          />
          <AddEventSchedule open={isOpen} onClose={changeStateOpen} />
        </div>
        <div className="app__schedule--content">
          <Calendar
            events={events}
            localizer={localizer}
            startAccessor="start"
            step={15}
            endAccessor="end"
            style={{ height: "1000px" }}
            showMultiDayTimes
            defaultDate={new Date("2022-06-01")}
            eventPropGetter={(event) => {
              if (event.forStyle === "Bodybulding") {
                const backgroundColor = "#52bfb4";
                const border = "0px";
                return { style: { backgroundColor, border } };
              }
              if (event.forStyle === "Fitness") {
                const backgroundColor = "#265dbd";
                const border = "0px";
                return { style: { backgroundColor, border } };
              }
              if (event.forStyle === "CrosFit") {
                const backgroundColor = "#6c26bd";
                const border = "0px";
                return { style: { backgroundColor, border } };
              }
              if (event.title) {
                const backgroundColor = "#04d960";
                const border = "0px";
                return { style: { backgroundColor, border } };
              }
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Schedule;
