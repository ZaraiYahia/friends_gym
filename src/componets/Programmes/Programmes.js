import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SingleProgramme from "./SingleProgramme";
import { AiOutlinePlus } from "react-icons/ai";
import fileDownload from "js-file-download";
import Axios from "axios";
import "./Programmes.css";
import AddProgrammeDiet from "../AddProgramme&Diet/AddProgrammeDiet";
import SendCode from "./SendCode";
import SnackBar from "../SnackBar/SnackBar";

const Programmes = () => {
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sendedDocument, setSendedDocument] = useState({
    docId: "",
    userId: "",
  });
  const [isOpenn, setIsOpenn] = useState(false);
  const [coachs, setCoachs] = useState([]);
  const [documents, setDocuments] = useState([]);
  const changeStateOpen = () => {
    setIsOpen(() => setIsOpen(false));
  };
  const changeStateOpenn = () => {
    setIsOpenn(() => setIsOpenn(false));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSendedDocument({ ...sendedDocument, [name]: value });
  };
  const handleDownload = (user) => {
    Axios.post(
      "http://localhost:3001/api/Download",
      { docUrl: user.docUrl },
      {
        responseType: "blob",
      }
    ).then((response) => {
      {
        fileDownload(
          response.data,
          `programme ${new Date().getTime().toString()}.pdf`
        );
      }
    });
  };
  const handleSend = (e) => {
    e.preventDefault();
    if (sendedDocument.docId && sendedDocument.userId) {
      const newSend = {
        ...sendedDocument,
      };
      Axios.put("http://localhost:3001/api/put/SendDocument", {
        id: newSend.userId,
        programmeId: newSend.docId,
      }).then((response) => {
        if (response.data.affectedRows === 1) {
          setType("success");
          setMessage("Programme has been send");
          snackBarRef.current.show();
        } else {
          setType("fail");
          setMessage("something went wrong,try again");
          snackBarRef.current.show();
        }
      });
      setSendedDocument({
        docId: "",
        userId: "",
      });
      setIsOpenn(false);
    } else {
      setType("wait");
      setMessage("Please, You must insert adherent ID");
      snackBarRef.current.show();
    }
  };
  const handleDelete = async (user) => {
    await Axios.delete(
      `http://localhost:3001/api/DeleteDocument/${user.id}`
    ).then((response) => {
      if (response.data.affectedRows === 1) {
        setType("success");
        setMessage("Programme has been deleted");
        snackBarRef.current.show();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setType("fail");
        setMessage("something went wrong,try again");
        snackBarRef.current.show();
      }
    });
  };
  useEffect(() => {
    const abortCont = new AbortController();
    Axios.get("http://localhost:3001/api/get/AllCoachs", {
      signal: abortCont.signal,
    }).then((response) => {
      setCoachs(response.data);
    });
    return () => abortCont.abort();
  }, []);
  useEffect(() => {
    const abortCont = new AbortController();
    Axios.get("http://localhost:3001/api/get/Documents", {
      signal: abortCont.signal,
    }).then((response) => {
      setDocuments(response.data);
    });
    return () => abortCont.abort();
  }, []);

  return (
    <motion.div
      className="app__programmes-container"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.4 } }}
    >
      <div className="app__programmes-content">
        <div className="app__programmes_content-header">
          <h2>Programmes</h2>
          <AiOutlinePlus
            className="addprogramme-btn"
            onClick={() => {
              setIsOpen(true);
            }}
          />
          <AddProgrammeDiet
            open={isOpen}
            onClose={changeStateOpen}
            Data={coachs}
          />
        </div>
        <div className="app__programmes_content-body">
          {documents.map((document) => {
            return (
              <SingleProgramme
                key={document.doc_id}
                {...document}
                formData={sendedDocument}
                setFormData={setSendedDocument}
                onDownload={handleDownload}
                onSend={handleSend}
                onSelect={setIsOpenn}
                onDelete={handleDelete}
              ></SingleProgramme>
            );
          })}
          <SnackBar message={message} type={type} ref={snackBarRef} />
          <SendCode
            open={isOpenn}
            onClose={changeStateOpenn}
            formData={sendedDocument}
            onChange={handleChange}
            onSend={handleSend}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Programmes;
