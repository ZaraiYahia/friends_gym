import React, { useState } from "react";
import { AiOutlineMinus, AiFillDelete } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { FaCloudDownloadAlt } from "react-icons/fa";
import "./Diets.css";

const SingleDiet = (props) => {
  return (
    <div className="app__singlediets-container">
      <header>
        <h2 style={{ fontSize: "23px", textTransform: "uppercase" }}>
          {props.doc_name}
        </h2>
        <h3>by {props.last_name + " " + props.first_name}</h3>
        <div>
          <button
            className="show-btn"
            onClick={() => {
              props.onDownload({ docUrl: props.doc_url });
            }}
          >
            <FaCloudDownloadAlt />
          </button>
          <button
            className="show-btn"
            onClick={() => {
              props.onSelect(true);
              props.setFormData({ ...props.formData, docId: props.doc_id });
            }}
          >
            <IoIosSend />
          </button>
          <button
            className="show-btn"
            onClick={() => props.onDelete({ id: props.doc_id })}
          >
            <AiFillDelete />
          </button>
        </div>
      </header>
    </div>
  );
};

export default SingleDiet;
