import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RiUserSearchFill } from "react-icons/ri";
import { IoMdCreate } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import "../Groupes/Groupes.css";
import ConfirmationFormCode from "../Confirmation/ConfirmationFormCode";
import GroupesTable from "./GroupesTable";
import Axios from "axios";
import GroupDescription from "./GroupDescription";
import EditGroup from "../EditGroup/EditGroup";
import SnackBar from "../SnackBar/SnackBar";

const Groupes = () => {
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isOpennn, setIsOpennn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [q, setQ] = useState("");
  const [groupes, setGroupes] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [updatedGroup, setUpdatedGroup] = useState({
    groupname: "",
    totalmembre: "",
    groupcoach: "",
    typeofgroup: "",
  });
  const Keys = ["group_name", "group_id", "designation_cat"];

  const changeStateOpen = () => {
    setIsOpennn(() => setIsOpennn(false));
    setIsOpen(() => setIsOpen(false));
    setFormOpen(() => setFormOpen(false));
  };
  const conditionStateOpen = () => {
    setIsOpen(() => setIsOpen(true));
    setIsOpennn(() => setIsOpennn(true));
  };
  const changeFormState = (group) => {
    setFormOpen(() => setFormOpen(true));
    setUpdatedGroup(group);
  };
  const selectDeleteUser = async (group) => {
    await Axios.delete(
      `http://localhost:3001/api/DeleteGroup/${group.id}`
    ).then((response) => {
      if (response.data.affectedRows === 1) {
        setType("success");
        setMessage("Group successfully deleted");
        snackBarRef.current.show();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setType("fail");
        setMessage("something went wrong");
        snackBarRef.current.show();
      }
    });
  };
  const search = (groupes) => {
    return groupes.filter((row) =>
      Keys.some((key) => row[key].toLowerCase().includes(q))
    );
  };
  useEffect(() => {
    const abortCont = new AbortController();
    Axios.get("http://localhost:3001/api/get/Groupes", {
      signal: abortCont.signal,
    }).then((response) => {
      setGroupes(response.data);
    });
    return () => abortCont.abort();
  }, []);
  return (
    <motion.div
      className="app__groupes-container"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.4 } }}
    >
      <div className="app__groupes-contient">
        <div className="app__allgroupes_contient-header">
          <label
            htmlFor="groupes"
            className="app__allgroupes_contient_header-lab"
          >
            All Groupes
          </label>
          <input
            type="text"
            id="groupes"
            placeholder="groupes_Id"
            name="q"
            onChange={(e) => setQ(e.target.value)}
          ></input>
          <RiUserSearchFill className="style___svg" />
        </div>
        <div className="app__allgroupes_contient-body">
          <GroupDescription Data={search(groupes)} />
          <GroupesTable
            Data={search(groupes)}
            onSelect={changeFormState}
            onDelete={selectDeleteUser}
          />
          <SnackBar message={message} type={type} ref={snackBarRef} />
          <EditGroup
            open={formOpen}
            Data={updatedGroup}
            onClose={changeStateOpen}
          />
        </div>
        <div className="app__allgroupes_contient-footer">
          <div className="app__allgroupes_footer-inside">
            <label
              htmlFor="add-membre"
              className="app__allgroupes_contient-lab"
            >
              Create a new groupe
            </label>
            <button
              id="add-groupes-btn"
              onClick={() => navigate("CreateGroup")}
            >
              <IoMdCreate className="style-svg" />
            </button>
          </div>
          <div className="app__allgroupes_footer-inside">
            <label
              htmlFor="add-membre"
              className="app__allgroupes_contient-lab"
            >
              Add a membre to a groupe
            </label>
            <button id="add-groupes-btn">
              <FaUserPlus
                className="style__svgg"
                onClick={conditionStateOpen}
              />
            </button>
            <ConfirmationFormCode
              open={isOpen}
              opennn={isOpennn}
              onClose={changeStateOpen}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Groupes;
