import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./AddEventContent.css";

const AddEventContent = ({ Data, groupes, onChange, onClose }) => {
  return (
    <>
      <div className="app__addeventcontent_content-header">
        <h2>Add A Session</h2>
        <AiOutlineClose className="close-btnn" onClick={onClose} />
      </div>
      <form>
        <div className="app__addeventcontent-row">
          <div className="app__addeventcontent-col">
            <label htmlFor="Session_title">Session Title :</label>
            <input
              type="text"
              id="Session_title"
              placeholder="Session Title"
              name="title"
              value={Data.title}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="app__addeventcontent-row">
          <div className="app__addeventcontent-col">
            <label htmlFor="session1">
              Start Date<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="datetime-local"
              id="session1"
              name="startDate"
              value={Data.startDate}
              onChange={onChange}
            />
          </div>
          <div className="app__addeventcontent-col">
            <label htmlFor="session1">
              End Date<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="datetime-local"
              id="session1"
              name="endDate"
              value={Data.endDate}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="app__addeventcontent-row">
          <div className="app__addeventcontent-col">
            <label htmlFor="Event_site">
              Event Site :
              <span style={{ color: "red", fontSize: "18px" }}>(optional)</span>
            </label>
            <input
              type="text"
              id="Event_site"
              placeholder="first_name"
              name="eventSite"
              value={Data.eventSite}
              onChange={onChange}
            />
          </div>
          <div className="app__addeventcontent-col">
            <label htmlFor="groupesession">
              Group session :
              <span style={{ color: "red", fontSize: "18px" }}>(optional)</span>
            </label>
            <select id="groupesession" name="groupId" onChange={onChange}>
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
    </>
  );
};

export default AddEventContent;
