import React from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import "./SendCode.css";

function SendCode({ open, onClose, formData, onChange, onSend }) {
  if (!open) return null;
  return (
    <motion.div
      className="app__sendcode-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="app__sendcode-content">
        <div className="app__sendcode_content-header">
          <h3>ENTER ADHERENT ID</h3>
          <AiOutlineClose className="close--btn" onClick={onClose} />
        </div>
        <form>
          <div className="app__sendcode-col">
            <input
              type="text"
              placeholder="confirmation code"
              name="userId"
              value={formData.userId}
              onChange={onChange}
            />
            <h5
              style={{ color: "red", marginLeft: "100px", marginTop: "15px" }}
            ></h5>
          </div>
          <div className="btn--container">
            <button type="Submit" className="confirm--btn" onClick={onSend}>
              SEND
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default SendCode;
