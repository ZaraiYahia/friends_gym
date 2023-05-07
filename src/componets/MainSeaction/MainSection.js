import React from "react";
import AboutUss from "../AboutUs/AboutUss";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import OurTeam from "../OurTeam/OurTeam";
import WhatDoBelieveIn from "../WhatWeBelive/WhatDoBelieveIn";
import WhatDo from "../WhatWeDoProvide/WhatDo";
import { motion } from "framer-motion";
import "./MainSection.css";

const MainSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      <AboutUss />
      <WhatDo />
      <WhatDoBelieveIn />
      <OurTeam />
      <Footer />
    </motion.div>
  );
};

export default MainSection;
