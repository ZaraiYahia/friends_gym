import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./EditEmployee.css";

const EditEmployee = ({ formData, onClose, onChange }) => {
  return (
    <div>
      <div className="app__editemployee_content-header">
        <h2>Employee edit form</h2>
        <AiOutlineClose className="close-btn" onClick={onClose} />
      </div>
      <form>
        <div className="app__editemployee-row">
          <div className="app__editemployee-col">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              placeholder="first_name"
              name="firstname"
              value={formData.firstname}
              onChange={onChange}
            />
          </div>
          <div className="app__editemployee-col">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              placeholder="last_name"
              name="lastname"
              value={formData.lastname}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="app__editemployee-row">
          <div className="app__editemployee-col">
            <label htmlFor="birthDate">Birthdate:</label>
            <input
              type="date"
              id="birthDate"
              placeholder="Birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={onChange}
            />
          </div>
          <div className="app__editemployee-col">
            <label htmlFor="gender">Gender :</label>
            <select id="gender" name="gender" onChange={onChange}>
              <option value="">Gender</option>

              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="app__editemployee-row">
          <div className="app__editemployee-col">
            <label htmlFor="e-mail">E-mail:</label>
            <input
              type="email"
              id="e-mail"
              placeholder="E-mail"
              name="emailaddress"
              value={formData.emailaddress}
              onChange={onChange}
            />
          </div>
          <div className="app__editemployee-col">
            <label htmlFor="password">Pass Word:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="app__editemployee-row">
          <div className="app__editemployee-col">
            <label htmlFor="adresse">Adresse:</label>
            <input
              type="text"
              id="adresse"
              placeholder="adresse"
              name="address"
              value={formData.address}
              onChange={onChange}
            />
          </div>
          <div className="app__editemployee-col">
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              placeholder="User_name"
              name="username"
              value={formData.username}
              onChange={onChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
