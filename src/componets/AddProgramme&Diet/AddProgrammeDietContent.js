import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./AddProgrammeDietContent.css";

const AddProgrammeDietContent = ({
  onClose,
  Data,
  dataForm,
  onChange,
  File,
  setFile,
}) => {
  return (
    <>
      <div className="app__programmediet_content-header">
        <h2>Add A Program/Diet </h2>
        <AiOutlineClose className="close-btnn" onClick={onClose} />
      </div>
      <form>
        <div className="app__programmediet-row">
          <div className="app__programmediet-col">
            <label htmlFor="document_url">uploade it :</label>
            <input
              type="file"
              id="document_url"
              name="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div className="app__programmediet-row">
          <div className="app__programmediet-col">
            <label htmlFor="documentname">
              Program/Diet Name :<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="documentname"
              placeholder="Program"
              name="documentName"
              value={dataForm.documentName}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="app__programmediet-row">
          <div className="app__programmediet-col">
            <label htmlFor="Event_site">Coach :</label>
            <select id="groupcoach" name="documentCoach" onChange={onChange}>
              <option value="">coach Full Name</option>
              {Data.map((coach) => {
                const { coach_id, first_name, last_name } = coach;
                return (
                  <option key={coach_id} value={coach_id}>
                    {last_name + " " + first_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="app__programmediet-col">
            <label htmlFor="doccategorie">Program categorie :</label>
            <select
              id="doccategorie"
              name="documentCaegorie"
              onChange={onChange}
            >
              <option value="">categorie</option>
              <option value="1">Programme Mass</option>
              <option value="2">Programme Force</option>
              <option value="3">Programme Mass-Force</option>
              <option value="4">Diet</option>
            </select>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProgrammeDietContent;
