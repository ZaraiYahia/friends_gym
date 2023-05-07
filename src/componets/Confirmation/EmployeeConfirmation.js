import React, { useState, useRef } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import "./EmployeeConfirmation.css";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SnackBar from "../SnackBar/SnackBar";

const EmployeeConfirmation = () => {
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [confEmployee, setConfEmployee] = useState(location.state);
  const [employee, setEmployee] = useState({
    id: confEmployee.idMembre,
    firstname: confEmployee.first_name,
    lastname: confEmployee.last_name,
    birthdate: confEmployee.birth_date,
    gender: confEmployee.gender,
    emailaddress: confEmployee.mail_address,
    password: confEmployee.pass_word,
    address: confEmployee.address,
    username: confEmployee.user_name,
    phonenumber: confEmployee.phone,
    role: "",
    startdate: "",
    contractduration: "",
    typeofcoaching: "",
    salary: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployee({ ...employee, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (employee.firstname &&
        employee.lastname &&
        employee.birthdate &&
        employee.gender &&
        employee.emailaddress &&
        employee.password &&
        employee.address &&
        employee.username &&
        employee.phonenumber &&
        employee.role &&
        employee.startdate &&
        employee.contractduration &&
        employee.salary) ||
      employee.typeofcoaching
    ) {
      const newEmployee = {
        ...employee,
        role: 3,
      };
      if (employee.role === "coach") {
        Axios.post("http://localhost:3001/api/Employee/coachRegistration", {
          firstName: newEmployee.firstname,
          lastName: newEmployee.lastname,
          birthDate: newEmployee.birthdate,
          sex: newEmployee.gender,
          address: newEmployee.address,
          mailAddress: newEmployee.emailaddress,
          password: newEmployee.password,
          userName: newEmployee.username,
          phone: newEmployee.phonenumber,
          startDate: newEmployee.startdate,
          contratDuration: newEmployee.contractduration,
          salary: newEmployee.salary,
          typeOfCoaching: newEmployee.typeofcoaching,
          role: newEmployee.role,
        }).then((response) => {
          if (response.data.affectedRows === 1) {
            setType("success");
            setMessage("Done,Your confirmation has been submited");
            snackBarRef.current.show();
          } else {
            setType("fail");
            setMessage("something went wrong");
            snackBarRef.current.show();
          }
        });
        setEmployee({
          id: "",
          firstname: "",
          lastname: "",
          birthdate: "",
          gender: "",
          emailaddress: "",
          password: "",
          address: "",
          username: "",
          phonenumber: "",
          role: "",
          startdate: "",
          contractduration: "",
          typeofcoaching: "",
          salary: "",
        });
        setTimeout(() => {
          navigate("/Login/Admin/Employees");
        }, 3000);
      }
      if (employee.role == "operateur") {
        const newEmployee = {
          ...employee,
          role: 2,
        };
        Axios.post("http://localhost:3001/api/Employee/operateurRegistration", {
          firstName: newEmployee.firstname,
          lastName: newEmployee.lastname,
          birthDate: newEmployee.birthdate,
          sex: newEmployee.gender,
          address: newEmployee.address,
          mailAddress: newEmployee.emailaddress,
          password: newEmployee.password,
          userName: newEmployee.username,
          phone: newEmployee.phonenumber,
          startDate: newEmployee.startdate,
          contratDuration: newEmployee.contractduration,
          salary: newEmployee.salary,
          role: newEmployee.role,
        }).then((response) => {
          if (response.data.affectedRows === 1) {
            setType("success");
            setMessage("Done,Your confirmation has been submited");
            snackBarRef.current.show();
          } else {
            setType("fail");
            setMessage("something went wrong");
            snackBarRef.current.show();
          }
        });
        setEmployee({
          id: "",
          firstname: "",
          lastname: "",
          birthdate: "",
          gender: "",
          emailaddress: "",
          password: "",
          address: "",
          username: "",
          phonenumber: "",
          role: "",
          startdate: "",
          contractduration: "",
          typeofcoaching: "",
          salary: "",
        });
        setTimeout(() => {
          navigate("/Login/Admin/Employees");
        }, 3000);
      }
      if (employee.role === "admin") {
        const newEmployee = {
          ...employee,
          role: 1,
        };
        Axios.post("http://localhost:3001/api/Employee/adminRegistration", {
          firstName: newEmployee.firstname,
          lastName: newEmployee.lastname,
          birthDate: newEmployee.birthdate,
          sex: newEmployee.gender,
          address: newEmployee.address,
          mailAddress: newEmployee.emailaddress,
          password: newEmployee.password,
          userName: newEmployee.username,
          phone: newEmployee.phonenumber,
          startDate: newEmployee.startdate,
          contratDuration: newEmployee.contractduration,
          salary: newEmployee.salary,
          role: newEmployee.role,
        }).then((response) => {
          if (response.data.affectedRows === 1) {
            setType("success");
            setMessage("Done,Your confirmation has been submited");
            snackBarRef.current.show();
          } else {
            setType("fail");
            setMessage("something went wrong");
            snackBarRef.current.show();
          }
        });
        setEmployee({
          id: "",
          firstname: "",
          lastname: "",
          birthdate: "",
          gender: "",
          emailaddress: "",
          password: "",
          address: "",
          username: "",
          phonenumber: "",
          role: "",
          startdate: "",
          contractduration: "",
          typeofcoaching: "",
          salary: "",
        });
        setTimeout(() => {
          navigate("/Login/Admin/Employees");
        }, 3000);
      }
    } else {
      setType("wait");
      setMessage("Please, You must insert all info");
      snackBarRef.current.show();
    }
  };
  const [passwordEye, setPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };
  return (
    <motion.div
      className="app__employeeconfirm-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="app__employeeconfirm-content">
        <div className="app__employeeconfirm_content-header">
          <h2>Employee Confirmation form</h2>
          <h5>
            Confirmation ID:{" "}
            <span style={{ color: "blue" }}>{confEmployee.idMembre}</span>
          </h5>
        </div>
        <form>
          <div className="app__employeeconfirm-row">
            <div className="app__employeeconfirm-col">
              <label htmlFor="firstname">First Name:</label>
              <input
                type="text"
                id="firstname"
                placeholder="first_name"
                name="firstname"
                value={employee.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="app__employeeconfirm-col">
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                placeholder="last_name"
                name="lastname"
                value={employee.lastname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="app__employeeconfirm-row">
            <div className="app__employeeconfirm-col">
              <label htmlFor="birthDate">Birthdate:</label>
              <input
                type="date"
                id="birthDate"
                placeholder="Birthdate"
                name="birthdate"
                value={employee.birthdate}
                onChange={handleChange}
              />
            </div>
            <div className="app__employeeconfirm-col">
              <label htmlFor="gender">gender:</label>
              <select id="gender" name="gender" onChange={handleChange}>
                <option value="">gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="app__employeeconfirm-row">
            <div className="app__employeeconfirm-col">
              <label htmlFor="e-mail">E-mail:</label>
              <input
                type="email"
                id="e-mail"
                placeholder="E-mail"
                name="emailaddress"
                value={employee.emailaddress}
                onChange={handleChange}
              />
            </div>
            <div className="app__employeeconfirm-col">
              <label htmlFor="password">Pass Word:</label>
              <input
                type={passwordEye === false ? "password" : "text"}
                id="password"
                placeholder="Password"
                name="password"
                value={employee.password}
                onChange={handleChange}
              />
              <div className="hideandshoww">
                {passwordEye === false ? (
                  <AiFillEyeInvisible onClick={handlePasswordClick} />
                ) : (
                  <AiFillEye onClick={handlePasswordClick} />
                )}
              </div>
            </div>
          </div>
          <div className="app__employeeconfirm-row">
            <div className="app__employeeconfirm-col">
              <label htmlFor="adresse">Adresse:</label>
              <input
                type="text"
                id="adresse"
                placeholder="adresse"
                name="address"
                value={employee.address}
                onChange={handleChange}
              />
            </div>
            <div className="app__employeeconfirm-col">
              <label htmlFor="phonenumber">Phone number:</label>
              <input
                type="text"
                id="phonenumber"
                placeholder="Phone_number"
                name="phonenumber"
                value={employee.phonenumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="app__employeeconfirm-row">
            <div className="app__employeeconfirm-col">
              <label htmlFor="userName">User Name:</label>
              <input
                type="text"
                id="userName"
                placeholder="User_name"
                name="username"
                value={employee.username}
                onChange={handleChange}
              />
            </div>
            <div className="app__employeeconfirm-col">
              <label htmlFor="role">Role:</label>
              <select id="role" name="role" onChange={handleChange}>
                <option value="">role</option>
                <option value="admin">Administrateur</option>
                <option value="operateur">Operateur</option>
                <option value="coach">Coach</option>
              </select>
            </div>
          </div>
          <div className="app__employeeconfirm-row">
            <div className="app__employeeconfirm-col">
              <label htmlFor="startedate">Start date:</label>
              <input
                type="date"
                id="startedate"
                name="startdate"
                value={employee.startdate}
                onChange={handleChange}
              />
            </div>
            <div className="app__employeeconfirm-col">
              <label htmlFor="duration">contract duration:</label>
              <select
                id="duration"
                name="contractduration"
                onChange={handleChange}
              >
                <option value="">contract duration</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
              </select>
            </div>
          </div>
          <div className="app__employeeconfirm-row">
            <div className="app__employeeconfirm-col">
              <label htmlFor="userName">salary:</label>
              <input
                type="text"
                id="userName"
                placeholder="User_name"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
              />
            </div>
            <div className="app__employeeconfirm-col">
              <label htmlFor="typeofcoaching">Type of coaching :</label>
              <select
                id="typeofcoaching"
                name="typeofcoaching"
                onChange={handleChange}
              >
                <option value="">Type of coaching</option>
                <option value="1">Fitness</option>
                <option value="2">Bodybulding</option>
                <option value="3">CrosFit</option>
              </select>
            </div>
          </div>
          <div className="btn-container">
            <button
              type="Submit"
              className="confirm-btn"
              onClick={handleSubmit}
            >
              Confirm
            </button>
            <SnackBar message={message} type={type} ref={snackBarRef} />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EmployeeConfirmation;
