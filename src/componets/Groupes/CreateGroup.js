import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Axios from "axios";
import SnackBar from "../SnackBar/SnackBar";
import { useNavigate } from "react-router-dom";
import "../Groupes/CreateGroup.css";

const CreateGroup = () => {
  const navigate = useNavigate();
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [coachs, setCoachs] = useState([]);
  const [group, setGroup] = useState({
    groupname: "",
    totalmembre: "",
    groupcoach: "",
    typeofgroup: "",
  });
  const [session, setSession] = useState({
    session1_S: "",
    session1_E: "",
    session2_S: "",
    session2_E: "",
    session3_S: "",
    session3_E: "",
    session4_S: "",
    session4_E: "",
  });
  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setGroup({ ...group, [name]: value });
  };
  const handleChangeDate = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSession({ ...session, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (group.groupname &&
        group.groupcoach &&
        group.totalmembre &&
        group.typeofgroup &&
        session.session1_S &&
        session.session1_E) ||
      (session.session2_S && session.session2_E) ||
      (session.session3_S && session.session3_E) ||
      (session.session4_S && session.session4_E)
    ) {
      const newGroup = {
        ...group,
        id: new Date().getTime().toString(),
      };
      const newSession = {
        ...session,
        group_id: newGroup.id,
        locals: 0,
      };
      Axios.post("http://localhost:3001/api/createGroup", {
        id: newGroup.id,
        groupName: group.groupname,
        groupCoach: group.groupcoach,
        totalMembre: group.totalmembre,
        typeOfGroup: group.typeofgroup,
      }).then((response) => {
        if (response.data.affectedRows === 1) {
          setType("success");
          setMessage("Group has been created");
          snackBarRef.current.show();
        } else {
          setType("fail");
          setMessage("something went wrong,try again");
          snackBarRef.current.show();
        }
      });
      Axios.post("http://localhost:3001/api/createSession", {
        session1_S: newSession.session1_S,
        session1_E: newSession.session1_E,
        session2_S: newSession.session2_S,
        session2_E: newSession.session2_E,
        session3_S: newSession.session3_S,
        session3_E: newSession.session3_E,
        session4_S: newSession.session4_S,
        session4_E: newSession.session4_E,
        group_id: newSession.group_id,
        locals: newSession.locals,
      }).then((response) => {
        if (response.data.message) {
          setTimeout(() => {
            setType("success");
            setMessage(response.data.message);
            snackBarRef.current.show();
          }, 5000);
        } else {
          setType("fail");
          setMessage("No session has been created !!");
          snackBarRef.current.show();
        }
      });

      setGroup({
        groupname: "",
        totalmembre: "",
        groupcoach: "",
        typeofgroup: "",
      });
      setSession({
        session1_S: "",
        session1_E: "",
        session2_S: "",
        session2_E: "",
        session3_S: "",
        session3_E: "",
        session4_S: "",
        session4_E: "",
      });
      setTimeout(() => {
        navigate("/Login/Admin/Groupes");
      }, 7000);
    } else {
      setType("wait");
      setMessage("Please, You must insert all info");
      snackBarRef.current.show();
    }
  };
  useEffect(() => {
    const abortCont = new AbortController();
    Axios.get("http://localhost:3001/api/get/AllCoachs", {
      signal: abortCont.signal,
    }).then((response) => {
      setCoachs(response.data);
    });
    return () => abortCont.abort();
  }, []);
  console.log(session);
  return (
    <motion.div
      className="app__creategroup-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="app__creategroup-content">
        <div className="app__creategroup_content-header">
          <h2>CREATE GROUP FORM</h2>
        </div>
        <form>
          <div className="app__creategroup-row">
            <div className="app__creategroup-col">
              <label htmlFor="group_name">Group Name :</label>
              <input
                type="text"
                id="group_name"
                placeholder="group name"
                name="groupname"
                value={group.groupname}
                onChange={handleChangeInput}
              />
            </div>
            <div className="app__creategroup-col">
              <label htmlFor="groupcoach">group coach :</label>
              <select
                id="groupcoach"
                name="groupcoach"
                onChange={handleChangeInput}
              >
                <option value="">coach Full Name</option>
                {coachs.map((coach) => {
                  const { coach_id, first_name, last_name } = coach;
                  return (
                    <option key={coach_id} value={coach_id}>
                      {last_name + " " + first_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="app__creategroup-row">
            <div className="app__creategroup-col">
              <label htmlFor="typeofgroup">Type of group :</label>
              <select
                id="typeofgroup"
                name="typeofgroup"
                onChange={handleChangeInput}
              >
                <option value="">Type of group</option>
                <option value="1">Fitness</option>
                <option value="2">Bodybulding</option>
                <option value="3">CrosFit</option>
              </select>
            </div>
            <div className="app__creategroup-col">
              <label htmlFor="totalmembre">Total membre :</label>
              <input
                type="text"
                id="totalmembre"
                placeholder="total membre"
                name="totalmembre"
                value={group.totalmembre}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div
            className="app__creategroup-row"
            style={{
              position: "relative",
              background: "aliceblue",
              marginLeft: 0,
              marginRight: 0,
            }}
          ></div>
          <div className="app__creategroup-row">
            <div className="app__creategroup-col">
              <label htmlFor="starttime">Schedule of each session :</label>
            </div>
          </div>
          <div className="app__creategroup-row">
            <div className="app__creategroup_time-col">
              <label htmlFor="session1">
                Start of session 1<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="datetime-local"
                id="session1"
                name="session1_S"
                value={session.session1_S}
                onChange={handleChangeDate}
              />
            </div>
            <div className="app__creategroup_time-col">
              <label htmlFor="session1e">
                End of session 1<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="datetime-local"
                id="session1e"
                name="session1_E"
                value={session.session1_E}
                onChange={handleChangeDate}
              />
            </div>
          </div>
          <div className="app__creategroup-row">
            <div className="app__creategroup_time-col">
              <label htmlFor="secondday">
                Start of session 2<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="datetime-local"
                id="meeting-time"
                name="session2_S"
                value={session.session2_S}
                onChange={handleChangeDate}
              />
            </div>
            <div className="app__creategroup_time-col">
              <label htmlFor="firstday">
                End of session 2<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="datetime-local"
                id="meeting-time"
                name="session2_E"
                value={session.session2_E}
                onChange={handleChangeDate}
              />
            </div>
          </div>
          <div className="app__creategroup-row">
            <div className="app__creategroup_time-col">
              <label htmlFor="thirdday">
                Start of session 3<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="datetime-local"
                id="meeting-time"
                name="session3_S"
                value={session.session3_S}
                onChange={handleChangeDate}
              />
            </div>
            <div className="app__creategroup_time-col">
              <label htmlFor="firstday">
                End of session 3<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="datetime-local"
                id="meeting-time"
                name="session3_E"
                value={session.session3_E}
                onChange={handleChangeDate}
              />
            </div>
          </div>
          <div className="app__creategroup-row">
            <div className="app__creategroup_time-col">
              <label htmlFor="fourthday">
                Start of session 4<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="datetime-local"
                id="meeting-time"
                name="session4_S"
                value={session.session4_S}
                onChange={handleChangeDate}
              />
            </div>
            <div className="app__creategroup_time-col">
              <label htmlFor="fourthday">
                End of session 4<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="datetime-local"
                id="meeting-time"
                name="session4_E"
                value={session.session4_E}
                onChange={handleChangeDate}
              />
            </div>
          </div>
          <div className="btn-container">
            <button
              type="Submit"
              className="confirm-btn"
              onClick={handleSubmit}
            >
              Create
            </button>
            <SnackBar message={message} type={type} ref={snackBarRef} />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateGroup;
