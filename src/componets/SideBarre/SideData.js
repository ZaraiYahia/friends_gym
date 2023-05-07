import React from "react";
import { HiUserGroup } from "react-icons/hi";
import { BiUserPin } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { AiFillFilePdf } from "react-icons/ai";
import { MdDownloading } from "react-icons/md";


import Axios from "axios";



export const Data = [
  {
    id: 1,
    url: "Membres",
    text: "Membres",
    icon: <BiUserPin />,
  },
  {
    id: 2,
    url: "Employees",
    text: "Employees",
    icon: <FaUserTie />,
  },
  {
    id: 3,
    url: "Groupes",
    text: "Groupes",
    icon: <HiUserGroup />,
  },
  {
    id: 4,
    url: "Schedules",
    text: "Schedule",
    icon: <FaUserClock />,
  },
  {
    id: 5,
    url: "Programmes",
    text: "Programmes",
    icon: <AiFillFilePdf />,
  },
  {
    id: 6,
    url: "Diets",
    text: "Diets",
    icon: <AiFillFilePdf />,
  },
  {
    id: 7,
    url: "#",
    text: "coming Soon",
    icon: <MdDownloading />,
  },
 
];

export default Data;
