import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./componets/Login/Login";
import Registre from "./componets/Registre/Registre";
import MainSection from "./componets/MainSeaction/MainSection";
import { AnimatePresence } from "framer-motion";
import AdminProfil from "./componets/AdminProfil/AdminProfil";
import Membre from "./componets/Membre/Membre";
import Membree from "./componets/Membre/Membree";
const AnimatedRoutes = () => {
  const [inactive, setInactive] = useState(false);
  const changeState = () => {
    setInactive(() => setInactive(!inactive));
  };
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<MainSection />} exact />
        <Route path="/Registre" element={<Registre />} exact />
        <Route path="/Login" element={<Login />} exact />
        <Route
          path="/Login/Admin/*"
          element={<AdminProfil ina={inactive} changeState={changeState} />}
          exact
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
