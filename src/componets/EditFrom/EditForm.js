import React, { useState, useEffect, useRef } from "react";
import EditEmployee from "./EditEmployee";
import EditEmployeePersonal from "./EditEmployeePersonal";
import "./EditForm.css";
import Axios from "axios";
import SnackBar from "../SnackBar/SnackBar";

const EditForm = ({ open, onClose, Data }) => {
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const FormTitle = ["Edit Employee", "Edit Employee"];
  const [employeeFormData, setEmployeeFormData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    gender: "",
    emailaddress: "",
    password: "",
    address: "",
    username: "",
    role: "",
    startdate: "",
    contractduration: "",
    typeofcoaching: "",
    salary: "",
  });
  useEffect(() => {
    setEmployeeFormData({
      id: Data.id,
      firstname: Data.firstname,
      lastname: Data.lastname,
      birthdate: Data.birthdate,
      gender: Data.gender,
      emailaddress: Data.emailaddress,
      password: "",
      address: Data.address,
      username: Data.username,
      role: "",
      startdate: Data.startdate,
      contractduration: "",
      typeofcoaching: Data.typeofcoaching,
      salary: Data.salary,
    });
  }, [Data]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployeeFormData({ ...employeeFormData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      employeeFormData.firstname &&
      employeeFormData.lastname &&
      employeeFormData.birthdate &&
      employeeFormData.gender &&
      employeeFormData.emailaddress &&
      employeeFormData.address &&
      employeeFormData.password &&
      employeeFormData.role
    ) {
      const editEmployee = {
        ...employeeFormData,
      };
      if (editEmployee.role === "coach") {
        Axios.put("http://localhost:3001/api/put/EditCoach", {
          iD: editEmployee.id,
          firstName: editEmployee.firstname,
          lastName: editEmployee.lastname,
          birthDate: editEmployee.birthdate,
          gender: editEmployee.gender,
          address: editEmployee.address,
          mailAddress: editEmployee.emailaddress,
          password: editEmployee.password,
          userName: editEmployee.username,
          startdate: editEmployee.startdate,
          contractduration: editEmployee.contractduration,
          typeofcoaching: editEmployee.typeofcoaching,
          salary: editEmployee.salary,
        })
          .then((response) => {
            if (response.data.affectedRows === 1) {
              setType("success");
              setMessage("Coach has been updated");
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
        setEmployeeFormData({
          id: "",
          firstname: "",
          lastname: "",
          birthdate: "",
          gender: "",
          emailaddress: "",
          password: "",
          address: "",
          username: "",
          role: "",
          startdate: "",
          contractduration: "",
          typeofcoaching: "",
          salary: "",
        });
      }
      if (editEmployee.role === "operateur") {
        const editEmployee = {
          ...employeeFormData,
        };
        console.log("hiii");
        Axios.put("http://localhost:3001/api/put/EditOperateur", {
          iD: editEmployee.id,
          firstName: editEmployee.firstname,
          lastName: editEmployee.lastname,
          birthDate: editEmployee.birthdate,
          gender: editEmployee.gender,
          address: editEmployee.address,
          mailAddress: editEmployee.emailaddress,
          password: editEmployee.password,
          userName: editEmployee.username,
          startdate: editEmployee.startdate,
          contractduration: editEmployee.contractduration,
          salary: editEmployee.salary,
        })
          .then((response) => {
            if (response.data.affectedRows === 1) {
              setType("success");
              setMessage("Operateur has been updated");
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
        setEmployeeFormData({
          id: "",
          firstname: "",
          lastname: "",
          birthdate: "",
          gender: "",
          emailaddress: "",
          password: "",
          address: "",
          username: "",
          role: "",
          startdate: "",
          contractduration: "",
          typeofcoaching: "",
          salary: "",
        });
      }
      if (editEmployee.role === "admin") {
        const editEmployee = {
          ...employeeFormData,
        };
        Axios.put("http://localhost:3001/api/put/EditAdminn", {
          iD: editEmployee.id,
          firstName: editEmployee.firstname,
          lastName: editEmployee.lastname,
          birthDate: editEmployee.birthdate,
          gender: editEmployee.gender,
          address: editEmployee.address,
          mailAddress: editEmployee.emailaddress,
          password: editEmployee.password,
          userName: editEmployee.username,
          startdate: editEmployee.startdate,
          contractduration: editEmployee.contractduration,
          salary: editEmployee.salary,
        })
          .then((response) => {
            if (response.data.affectedRows === 1) {
              setType("success");
              setMessage("Admin has been updated");
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
        setEmployeeFormData({
          id: "",
          firstname: "",
          lastname: "",
          birthdate: "",
          gender: "",
          emailaddress: "",
          password: "",
          address: "",
          username: "",
          role: "",
          startdate: "",
          contractduration: "",
          typeofcoaching: "",
          salary: "",
        });
      }
    } else {
      setType("wait");
      setMessage("Empty Values u should insert all values");
      snackBarRef.current.show();
    }
  };

  const ComponetDisplay = () => {
    if (page === 0) {
      return (
        <EditEmployee
          formData={employeeFormData}
          onClose={onClose}
          onChange={handleChange}
        />
      );
    } else {
      return (
        <EditEmployeePersonal
          formData={employeeFormData}
          onClose={onClose}
          onChange={handleChange}
        />
      );
    }
  };
  if (!open) return null;
  return (
    <div className="app__editform-container">
      <div className="app__editform-content">
        <div className="app__editform-compenent">{ComponetDisplay()}</div>
        <div className="app__editform-footer">
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

export default EditForm;
