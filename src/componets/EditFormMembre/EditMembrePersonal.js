import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import "./EditMembrePersonal.css";

const EditMembrePersonal = ({
  formData,
  onChange,
  onClose,
  message,
  groupes,
}) => {
  return (
    <div>
      <div className="app__editmembrepersonal_content-header">
        <h2>Membre edit form</h2>
        <AiOutlineClose className="close-btn" onClick={onClose} />
      </div>
      <form>
        <div className="app__editmembrepersonal-row">
          <div className="app__editmembrepersonal-col">
            <label htmlFor="subscription">Subscription :</label>
            <input
              type="date"
              id="subscription"
              name="subscription"
              value={formData.subscription}
              onChange={onChange}
            />
          </div>
          <div className="app__editmembrepersonal-col">
            <label htmlFor="cancel">Cancel :</label>
            <input
              type="date"
              id="cancel"
              name="cancel"
              value={formData.cancel}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="app__editmembrepersonal-row">
          <div className="app__editmembrepersonal-col">
            <label htmlFor="typeoftraining">Type of Training :</label>
            <select
              id="typeoftraining"
              name="typeOfTraining"
              onChange={onChange}
            >
              <option value="">type of traning</option>

              <option value="Fitness">Fitness</option>
              <option value="Bodybulding">Bodybulding</option>
              <option value="CrosFit">CrosFit</option>
              <option value="Mix">Mix</option>
            </select>
          </div>
          <div className="app__editmembrepersonal-col">
            <label htmlFor="groupesession">Group session :</label>
            <select id="groupesession" name="groupSession" onChange={onChange}>
              <option value="">group Name</option>
              {groupes.map((group) => {
                const { group_id, group_name } = group;
                return (
                  <option key={group_id} value={group_id}>
                    {group_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMembrePersonal;
