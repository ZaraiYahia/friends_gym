import React, { useEffect, useState, useRef } from "react";
import "./EditGroup.css";
import EditFormGroup from "./EditFormGroup";
import EditGroupSchedule from "./EditGroupSchedule";
import Axios from "axios";
import SnackBar from "../SnackBar/SnackBar";

const EditGroup = ({ Data, open, onClose }) => {
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [coachs, setCoachs] = useState([]);
  const [page, setPage] = useState(0);
  const [groupFormData, setGroupFormData] = useState({
    idgroup: "",
    groupname: "",
    totalmembre: "",
    groupcoach: "",
    typeofgroup: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setGroupFormData({ ...groupFormData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      groupFormData.idgroup &&
      groupFormData.groupname &&
      groupFormData.totalmembre &&
      groupFormData.groupcoach &&
      groupFormData.typeofgroup
    ) {
      const editGroup = {
        ...groupFormData,
      };
      Axios.put("http://localhost:3001/api/put/EditGroup", {
        iD: editGroup.idgroup,
        groupName: editGroup.groupname,
        totalPlaces: editGroup.totalmembre,
        groupCoach: editGroup.groupcoach,
        typeOfGroup: editGroup.typeofgroup,
      })
        .then((response) => {
          if (response.data.affectedRows === 1) {
            setType("success");
            setMessage("group successfully updated");
            snackBarRef.current.show();
          } else {
            setType("fail");
            setMessage("something went wrong ,try again");
            snackBarRef.current.show();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setGroupFormData({
        idgroup: "",
        groupname: "",
        totalmembre: "",
        groupcoach: "",
        typeofgroup: "",
      });
    } else {
      setType("wait");
      setMessage("Please, You must insert all info");
      snackBarRef.current.show();
    }
  };
  useEffect(() => {
    setGroupFormData({
      idgroup: Data.idgroup,
      groupname: Data.groupname,
      totalmembre: Data.totalmembre,
      groupcoach: Data.groupcoach,
      typeofgroup: Data.typeofgroup,
    });
  }, [Data]);
  useEffect(() => {
    const abortCont = new AbortController();
    Axios.get("http://localhost:3001/api/get/AllCoachs", {
      signal: abortCont.signal,
    }).then((response) => {
      setCoachs(response.data);
    });
    return () => abortCont.abort();
  }, []);
  const ComponetDisplay = () => {
    if (page === 0) {
      return (
        <EditFormGroup
          coachs={coachs}
          formData={groupFormData}
          onChange={handleChange}
          onClose={onClose}
        />
      );
    }
  };
  if (!open) return null;
  return (
    <div className="app__editgroup-container">
      <div className="app__editgroup-content">
        <div className="app__editgroup-compenent">{ComponetDisplay()}</div>
        <div className="app__editgroup-footer">
          <button
            className="style-btn"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Edit
          </button>
          <SnackBar message={message} type={type} ref={snackBarRef} />
        </div>
      </div>
    </div>
  );
};

export default EditGroup;
