import React from "react";
import "../Groupes/CreateGroup.css";
import "./EditFormGroup.css";
import { AiOutlineClose } from "react-icons/ai";

const EditFormGroup = ({ formData, onChange, onClose, coachs }) => {
  return (
    <div>
      <div className="app__editformgroup_content-header">
        <h2>Edit Group</h2>
        <AiOutlineClose className="close-btn" onClick={onClose} />
      </div>
      <form>
        <div className="app__editformgroup-row">
          <div className="app__editformgroup-col">
            <label htmlFor="group_name">Group Name:</label>
            <input
              type="text"
              id="group_name"
              placeholder="first_name"
              name="groupname"
              value={formData.groupname}
              onChange={onChange}
            />
          </div>
          <div className="app__editformgroup-col">
            <label htmlFor="groupcoach">group coach :</label>
            <select id="groupcoach" name="groupcoach" onChange={onChange}>
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
        <div className="app__editformgroup-row">
          <div className="app__editformgroup-col">
            <label htmlFor="totalmembre">Total Membre:</label>
            <input
              type="text"
              id="totalmembre"
              placeholder="totalmembre"
              name="totalmembre"
              value={formData.totalmembre}
              onChange={onChange}
            />
          </div>
          <div className="app__editformgroup-col">
            <label htmlFor="typeofgroup">Type Of Group :</label>
            <select id="typeofgroup" name="typeofgroup" onChange={onChange}>
              <option value="">Type Of Group</option>
              <option value="1">Fitness</option>
              <option value="2">Bodybulding</option>
              <option value="3">CrosFit</option>
              <option value="4">Mix</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditFormGroup;
