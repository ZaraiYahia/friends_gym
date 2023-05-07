import React from "react";
import "./EditGroupSchedule.css";
const EditGroupSchedule = () => {
  return (
    <div>
      <div className="app__editgroupschedule_content-header">
        <h2>Edit Group</h2>
      </div>
      <form>
        <div className="app__editgroupschedule-row">
          <div className="app__editgroupschedule-col">
            <label htmlFor="starttime" style={{ fontSize: "30px" }}>
              Start Time :
            </label>
          </div>
        </div>
        <div className="app__editgroupschedule-row">
          <div className="app__editgroupschedule-col">
            <label htmlFor="firstday">The First Day :</label>
            <input type="time"></input>
          </div>
          <div className="app__editgroupschedule-col">
            <label htmlFor="secondday">The second Day :</label>
            <input type="time"></input>
          </div>
        </div>
        <div className="app__editgroupschedule-row">
          <div className="app__editgroupschedule-col">
            <label htmlFor="thirdday">The third day:</label>
            <input type="time"></input>
          </div>
          <div className="app__editgroupschedule-col">
            <label htmlFor="fourthday">the Fourth day :</label>
            <input type="time"></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditGroupSchedule;
