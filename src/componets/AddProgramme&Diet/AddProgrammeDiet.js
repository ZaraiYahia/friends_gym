import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import "./AddProgrammeDiet.css";
import Axios from "axios";
import AddProgrammeDietContent from "./AddProgrammeDietContent";
import SnackBar from "../SnackBar/SnackBar";

const AddProgrammeDiet = ({ open, onClose, Data }) => {
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const [documents, setDocuments] = useState({
    documentName: "",
    documentCoach: "",
    documentCaegorie: "",
  });
  const [file, setFile] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDocuments({ ...documents, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      file &&
      documents.documentName &&
      documents.documentCoach &&
      documents.documentCaegorie
    ) {
      const newDocument = {
        ...documents,
      };
      const filee = file;
      Axios.post(
        "http://localhost:3001/api/upload/ProgrammeAndDiet",
        {
          docUrl: filee,
          docName: newDocument.documentName,
          docCoach: newDocument.documentCoach,
          docCoategorie: newDocument.documentCaegorie,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((response) => {
        if (response.data.affectedRows === 1) {
          setType("success");
          setMessage("Done,Your document has been uploaded");
          snackBarRef.current.show();
        } else {
          setType("fail");
          setMessage("something went wrong");
          snackBarRef.current.show();
        }
      });
      setDocuments({
        documentName: "",
        documentCoach: "",
        documentCaegorie: "",
      });
      setFile({});
    } else {
      setType("wait");
      setMessage("Please, You must insert all info");
      snackBarRef.current.show();
    }
  };
  const ComponetDisplay = () => {
    if (page === 0) {
      return (
        <AddProgrammeDietContent
          onClose={onClose}
          Data={Data}
          dataForm={documents}
          File={file}
          setFile={setFile}
          onChange={handleChange}
        />
      );
    }
  };

  if (!open) return null;
  return (
    <motion.div
      className="app__programmediet-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="app__programmediet-content">
        <div className="app__programmediet-compenent">{ComponetDisplay()}</div>
        <div className="app__programmediet-footer">
          <button className="style-btn" onClick={handleSubmit}>
            UPload
          </button>
          <SnackBar message={message} type={type} ref={snackBarRef} />
        </div>
      </div>
    </motion.div>
  );
};

export default AddProgrammeDiet;
