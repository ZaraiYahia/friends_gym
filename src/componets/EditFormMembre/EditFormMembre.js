import React, { useEffect, useState, useRef } from "react";
import "./EditFormMembre.css";
import EditMembre from "./EditMembre";
import EditMembrePersonal from "./EditMembrePersonal";
import Axios from "axios";
import SnackBar from "../SnackBar/SnackBar";

const EditFormMembre = ({ open, Data, onClose }) => {
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const FormTitle = ["Edit Membre", "Edit Membre"];
  const [groupes, setGroupes] = useState([]);
  const [formData, setFormData] = useState({
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
  useEffect(() => {
    setFormData({
      id: Data.id,
      firstname: Data.firstname,
      lastname: Data.lastname,
      birthdate: Data.birthdate,
      gender: Data.gender,
      emailaddress: Data.emailaddress,
      password: "",
      address: Data.address,
      username: "",
      subscription: Data.subscription,
      cancel: Data.cancel,
      typeOfTraining: Data.typeOfTraining,
      groupSession: Data.groupSession,
    });
  }, [Data]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstname &&
      formData.lastname &&
      formData.birthdate &&
      formData.gender &&
      formData.emailaddress &&
      formData.address &&
      formData.subscription &&
      formData.cancel &&
      formData.typeOfTraining &&
      formData.username
    ) {
      const editAdherent = {
        ...formData,
      };
      Axios.put("http://localhost:3001/api/put/EditMembre", {
        iD: editAdherent.id,
        firstName: editAdherent.firstname,
        lastName: editAdherent.lastname,
        birthDate: editAdherent.birthdate,
        gender: editAdherent.gender,
        address: editAdherent.address,
        mailAddress: editAdherent.emailaddress,
        password: editAdherent.password,
        userName: editAdherent.username,
        subscription: editAdherent.subscription,
        cancel: editAdherent.cancel,
        typeOfTraining: editAdherent.typeOfTraining,
        groupSession: editAdherent.groupSession,
      }).then((response) => {
        if (response.data.affectedRows === 1) {
          setType("success");
          setMessage("Adherent successfully updated");
          snackBarRef.current.show();
        } else {
          setType("fail");
          setMessage("something went wrong");
          snackBarRef.current.show();
        }
      });
      setFormData({
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
    } else {
      setType("wait");
      setMessage("Please, You must insert all info");
      snackBarRef.current.show();
    }
  };
  const ComponetDisplay = () => {
    if (page === 0) {
      return (
        <EditMembre
          formData={formData}
          onChange={handleChange}
          onClose={onClose}
        />
      );
    } else {
      return (
        <EditMembrePersonal
          groupes={groupes}
          formData={formData}
          onChange={handleChange}
          onClose={onClose}
        />
      );
    }
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/Allgroupes").then((response) => {
      setGroupes(response.data);
    });
  }, []);

  if (!open) return null;

  return (
    <div className="app__editformmembre-container">
      <div className="app__editformmembre-content">
        <div className="app__editformmembre-compenent">{ComponetDisplay()}</div>
        <div className="app__editformmembre-footer">
          <button
            className="style-btn"
            disabled={page === 0}
            onClick={() => {
              setPage((currpage) => currpage - 1);
            }}
          >
            Prev
          </button>
          <button
            className="style-btn"
            onClick={(e) => {
              if (page === FormTitle.length - 1) {
              } else {
                setPage((currpage) => currpage + 1);
              }
              if (page === 1) {
                handleSubmit(e);
              }
            }}
          >
            {page === FormTitle.length - 1 ? "Edit" : "next"}
          </button>
          <SnackBar message={message} type={type} ref={snackBarRef} />
        </div>
      </div>
    </div>
  );
};

export default EditFormMembre;
