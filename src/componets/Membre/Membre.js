import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "../Confirmation/MembreConfirmation.css";
import MembreConfirmation from "../Confirmation/MembreConfirmation";
import { AnimatePresence } from "framer-motion";

const Membre = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="AddMembre" element={<MembreConfirmation />} exact />
      </Routes>
    </AnimatePresence>
  );
};

export default Membre;
