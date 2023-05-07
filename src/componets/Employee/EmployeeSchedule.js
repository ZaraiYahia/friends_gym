import React, { useState, useEffect } from "react";
import "./EmployeeSchedule.css";
import { Calendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { momentLocalizer } from "react-big-calendar";
import Axios from "axios";

const localizer = momentLocalizer(moment);
const EmployeeSchedule = () => {
  const [sessions, setSessions] = useState([]);
  const [coachSessions, setCoachSessions] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();
    Axios.get("http://localhost:3001/api/get/Sessions", {
      signal: abortCont.signal,
    }).then((response) => {
      setSessions(response.data);
    });
    Axios.get("http://localhost:3001/api/get/AllSessions/Coach", {
      signal: abortCont.signal,
    }).then((response) => {
      setCoachSessions(response.data);
    });
    return () => abortCont.abort();
  }, []);
  useEffect(async () => {
    setAllSessions([...sessions, ...coachSessions]);
  }, [sessions, coachSessions]);

  useEffect(() => {
    let newEvents = allSessions.map((session) => {
      const {
        session_id,
        first_name,
        last_name,
        group_name,
        designation_cat,
        starte_date_h,
        end_date_h,
        title,
        locals,
      } = session;
      if (locals === 1) {
        return {
          id: session_id,
          title: first_name + "   " + last_name + "-" + title,
          forStyle: title,
          start: new Date(starte_date_h),
          end: new Date(end_date_h),
        };
      }
      return {
        id: session_id,
        title: first_name + "   " + last_name + "-" + group_name,
        forStyle: designation_cat,
        start: new Date(starte_date_h),
        end: new Date(end_date_h),
      };
    });
    setEvents(newEvents);
  }, [allSessions]);
 
  return (
    <div className="app__schedule-containerr">
      <Calendar
        events={events}
        localizer={localizer}
        startAccessor="start"
        step={15}
        endAccessor="end"
        style={{ height: "1000px", width: "100%" }}
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
  );
};

export default EmployeeSchedule;
