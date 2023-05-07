import React, { useState } from "react";
import "./QrCode.css";
import { motion } from "framer-motion";

const QrCode = ({ open, onClose, Qrcode, code }) => {
  if (!open) return null;
  return (
    <motion.div
      className="app__qrcode-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="app__qrcode-content">
        <div className="app__qrcode_content-header">
          <h2>here is your code,click it to download!!</h2>
        </div>
        <form>
          <div className="app__qrcode-col">
            <a href={Qrcode} download="image.png">
              <img src={Qrcode} alt="img" />
            </a>
          </div>
          <div className="app__qrcode_content-header">
            <h2>or you can copy this code</h2>
          </div>
          <div className="app__qrcode-col">
            <h3 style={{ cursor: "copy" }}>{code}</h3>
          </div>
          <div className="btn--container">
            <button type="Submit" className="confirm--btnn" onClick={onClose}>
              Done
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default QrCode;
