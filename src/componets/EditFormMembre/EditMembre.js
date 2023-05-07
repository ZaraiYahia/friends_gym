import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import "./EditMembre.css";
const EditMembre = ({ formData, onChange, onClose }) => {
  return (
    <div>
      <div className="app__editmembre_content-header">
        <h2>Membre edit form</h2>
        <AiOutlineClose className="close-btn" onClick={onClose} />
      </div>
      <form>
        <div className="app__editmembre-row">
          <div className="app__editmembre-col">
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
          <div className="app__editmembre-col">
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
        <div className="app__editmembre-row">
          <div className="app__editmembre-col">
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
          <div className="app__editmembre-col">
            <label htmlFor="sex">Sex:</label>
            <select id="sex" name="gender" onChange={onChange}>
              <option value="">gender</option>

              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="app__editmembre-row">
          <div className="app__editmembre-col">
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
          <div className="app__editmembre-col">
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
        <div className="app__editmembre-row">
          <div className="app__editmembre-col">
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
          <div className="app__editmembre-col">
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

export default EditMembre;
