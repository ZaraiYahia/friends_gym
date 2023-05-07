import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./SnackBar.css";

const SnackBar = forwardRef((props, ref) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackBar(true);
      setTimeout(() => {
        setShowSnackBar(false);
      }, 3000);
    },
  }));
  return (
    <div
      className="app__snackbar"
      id={showSnackBar ? "show" : "hide"}
      style={{
        backgroundColor:
          props.type === "success"
            ? "#00F593"
            : props.type === "wait"
            ? "#ffa500"
            : props.type === "almost"
            ? "#19B5FE"
            : props.type === "nothing"
            ? "black"
            : "#FF0033",
        color:
          props.type === "success"
            ? "black"
            : props.type === "wait"
            ? "white"
            : props.type === "almost"
            ? "black"
            : props.type === "nothing"
            ? "white"
            : "white",
      }}
    >
      <div className="app__symbol">
        {props.type === "success" ? (
          <h1>&#x2714;</h1>
        ) : props.type === "wait" ? (
          <h1>&#x261B;</h1>
        ) : props.type === "almost" ? (
          <h1>&#x270D;</h1>
        ) : (
          <h1>&#x2718;</h1>
        )}
      </div>
      <div className="app__message">{props.message}</div>
    </div>
  );
});

export default SnackBar;
