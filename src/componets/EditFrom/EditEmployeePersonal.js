import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./EditEmployeePersonal.css";

const EditEmployeePersonal = ({ formData, onClose, onChange }) => {
  return (
    <div>
      <div className="app__editemployeepersonal_content-header">
        <h2>Employee edit form</h2>
        <AiOutlineClose className="close-btn" onClick={onClose} />
      </div>
      <form>
        <div className="app__editemployeepersonal-row">
          <div className="app__editemployeepersonal-col">
            <label htmlFor="startdate">Start date:</label>
            <input
              type="date"
              id="startdate"
              name="startdate"
              value={formData.startdate}
              onChange={onChange}
            />
          </div>
          <div className="app__editemployeepersonal-col">
            <label htmlFor="duration">contrat duration:</label>
            <select id="duration" name="contractduration" onChange={onChange}>
              <option value="">contrat duration</option>

              <option value="6 Month">6 Month</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
            </select>
          </div>
        </div>
        <div className="app__editemployeepersonal-row">
          <div className="app__editemployeepersonal-col">
            <label htmlFor="role">Role:</label>
            <select id="role" name="role" onChange={onChange}>
              <option value="">Role</option>
              <option value="admin">Admin</option>
              <option value="coach">Coach</option>
              <option value="operateur">Operateur</option>
            </select>
          </div>
          <div className="app__editemployeepersonal-col">
            <label htmlFor="typeofcoaching">Type of coaching :</label>
            <select
              id="typeofcoaching"
              name="typeofcoaching"
              onChange={onChange}
            >
              <option value="">Type of coaching</option>
              <option value="1">Fitness</option>
              <option value="2">Bodybulding</option>
              <option value="3">CrosFit</option>
            </select>
          </div>
        </div>
        <div className="app__editemployeepersonal-row">
          <div className="app__editemployeepersonal-col">
            <label htmlFor="salary">salary:</label>
            <input
              type="salary"
              id="startdate"
              placeholder="salary"
              name="salary"
              value={formData.salary}
              onChange={onChange}
            />
          </div>
          <div className="app__editemployeepersonal-col"></div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeePersonal;
