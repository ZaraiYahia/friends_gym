import React, { useEffect, useState, useRef } from "react";
import Coach from "./Coach";
import { RiUserSearchFill } from "react-icons/ri";
import { RiUser2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import "./Employee.css";
import EmployeeSchedule from "./EmployeeSchedule";
import ConfirmationFormCode from "../Confirmation/ConfirmationFormCode";
import Axios from "axios";
import EmployeeTable from "./EmployeeTable";
import EditForm from "../EditFrom/EditForm";
import Switch from "../Switch/Switch";
import SnackBar from "../SnackBar/SnackBar";

const Employee = ({ userInfo }) => {
  const snackBarRef = useRef(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [isToggledAdminF, setIsToggledAdminF] = useState(false);
  const [isToggledOperaF, setIsToggledOperaF] = useState(false);
  const [isToggledCoachF, setIsToggledCoachF] = useState(false);
  const [filterEmployee, setFilterEmployee] = useState([]);
  const [isOpenn, setIsOpenn] = useState(false);
  const [q, setQ] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [employee, setEmployee] = useState([]);
  const Keys = ["first_name", "last_name", "mail_address", "birth_date"];
  const [update, setUpdate] = useState({
    id: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    gender: "",
    emailaddress: "",
    password: "",
    address: "",
    username: "",
    role: "",
    startdate: "",
    contractduration: "",
    typeofcoaching: "",
    salary: "",
  });
  const changeStateOpen = () => {
    setIsOpenn(() => setIsOpenn(false));
    setIsOpen(() => setIsOpen(false));
    setFormOpen(() => setFormOpen(false));
  };
  const changeFormState = (user) => {
    setFormOpen(() => setFormOpen(true));
    setUpdate(user);
  };
  const conditionStateOpen = () => {
    setIsOpen(() => setIsOpen(true));
    setIsOpenn(() => setIsOpenn(true));
  };
  const selectDeleteUser = async (user) => {
    if (user.role === "Bodybulding" || "Fitness" || "CrosFit" || "Mix") {
      await Axios.delete(
        `http://localhost:3001/api/DeleteCoach/${user.id}`
      ).then((response) => {
        if (response.data.affectedRows === 1) {
          setType("success");
          setMessage("Coach has been deleted");
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
    }
    if (user.role === "Admin") {
      await Axios.delete(
        `http://localhost:3001/api/DeleteAdmin/${user.id}`
      ).then((response) => {
        if (response.data.affectedRows === 1) {
          setType("success");
          setMessage("Admin has been deleted");
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
    }
    if (user.role === "Operateur") {
      await Axios.delete(
        `http://localhost:3001/api/DeleteOperateur/${user.id}`
      ).then((response) => {
        if (response.data.affectedRows === 1) {
          setType("success");
          setMessage("Operateur has been deleted");
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
    }
  };

  const search = (coach) => {
    return coach.filter((row) =>
      Keys.some((key) => row[key].toLowerCase().includes(q))
    );
  };

  /// Filtre employee

  const filtreAdmin = (user) => {
    const designation = user.designation;

    if (designation === "Admin") {
      return user;
    }
  };

  const handleFilterAdmin = () => {
    if (!isToggledAdminF) {
      if (!isToggledCoachF && !isToggledOperaF) {
        const adminFilter = employee.filter(filtreAdmin);
        setIsToggledAdminF(!isToggledAdminF);
        if (adminFilter.length > 0) {
          setFilterEmployee(adminFilter);
        } else {
          console.log("nothing was found !!");
          setFilterEmployee(employee);
        }
      } else if (!isToggledCoachF || !isToggledOperaF) {
        const adminFilter = employee.filter(filtreAdmin);
        setIsToggledAdminF(!isToggledAdminF);
        if (adminFilter.length > 0) {
          setFilterEmployee([...filterEmployee, ...adminFilter]);
        } else {
          console.log("nothing was found !!");
          setFilterEmployee(employee);
        }
      }
    } else if (isToggledOperaF) {
      const operaFilter = employee.filter(filtreOpera);
      setFilterEmployee(operaFilter);
      setIsToggledAdminF(!isToggledAdminF);
    } else if (isToggledCoachF) {
      const coachFilter = employee.filter(filtreCoach);
      setFilterEmployee(coachFilter);
      setIsToggledAdminF(!isToggledAdminF);
    } else {
      setFilterEmployee(employee);
      setIsToggledAdminF(!isToggledAdminF);
    }
  };

  const filtreOpera = (user) => {
    const designation = user.designation;
    if (designation === "Operateur") {
      return user;
    }
  };

  const handleFilterOpera = () => {
    if (!isToggledOperaF) {
      if (!isToggledCoachF && !isToggledAdminF) {
        const operaFilter = employee.filter(filtreOpera);
        setIsToggledOperaF(!isToggledOperaF);
        if (operaFilter.length > 0) {
          setFilterEmployee(operaFilter);
        } else {
          console.log("nothing was found !!");
          setFilterEmployee(employee);
        }
      } else if (!isToggledCoachF || !isToggledAdminF) {
        console.log("i'm here");
        const operaFilter = employee.filter(filtreOpera);
        setIsToggledOperaF(!isToggledOperaF);
        if (operaFilter.length > 0) {
          setFilterEmployee([...filterEmployee, ...operaFilter]);
        } else {
          console.log("nothing was found !!");
          setFilterEmployee(employee);
        }
      }
    } else if (isToggledAdminF) {
      const adminFilter = employee.filter(filtreAdmin);
      setFilterEmployee(adminFilter);
      setIsToggledOperaF(!isToggledOperaF);
    } else if (isToggledCoachF) {
      const coachFilter = employee.filter(filtreCoach);
      setFilterEmployee(coachFilter);
      setIsToggledOperaF(!isToggledOperaF);
    } else {
      setFilterEmployee(employee);
      setIsToggledOperaF(!isToggledOperaF);
    }
  };

  const filtreCoach = (user) => {
    const role = user.role;
    if (role === 3) {
      return user;
    }
  };

  const handleFilterCoach = () => {
    if (!isToggledCoachF) {
      if (!isToggledOperaF && !isToggledAdminF) {
        const coachFilter = employee.filter(filtreCoach);
        setIsToggledCoachF(!isToggledCoachF);
        if (coachFilter.length > 0) {
          setFilterEmployee(coachFilter);
        } else {
          console.log("nothing was found !!");
          setFilterEmployee(employee);
        }
      } else if (!isToggledOperaF || !isToggledAdminF) {
        const coachFilter = employee.filter(filtreCoach);
        setIsToggledCoachF(!isToggledCoachF);
        if (coachFilter.length > 0) {
          setFilterEmployee([...filterEmployee, ...coachFilter]);
        } else {
          console.log("nothing was found !!");
          setFilterEmployee(employee);
        }
      }
    } else if (isToggledAdminF) {
      const adminFilter = employee.filter(filtreAdmin);
      setFilterEmployee(adminFilter);
      setIsToggledCoachF(!isToggledCoachF);
    } else if (isToggledOperaF) {
      const operaFilter = employee.filter(filtreOpera);
      setFilterEmployee(operaFilter);
      setIsToggledCoachF(!isToggledCoachF);
    } else {
      setFilterEmployee(employee);
      setIsToggledCoachF(!isToggledCoachF);
    }
  };
  useEffect(() => {
    const abortCont = new AbortController();
    Axios.get("http://localhost:3001/api/getEmployee/Employees", {
      signal: abortCont.signal,
    }).then((response) => {
      setEmployee(response.data);
      setFilterEmployee(response.data);
    });
    return () => abortCont.abort();
  }, []);

  return (
    <motion.div
      className="app__employee-container"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.4 } }}
    >
      <Coach />
      <div className="app__allemployee-container">
        <div className="app__allemployee-content">
          <div className="app__allemployee_content-header">
            <label
              htmlFor="employee"
              className="app__allemployee_content_header-lab"
            >
              All Employee
            </label>
            <input
              type="text"
              id="employee"
              placeholder="employee_Id"
              name="q"
              onChange={(e) => setQ(e.target.value)}
            ></input>
            <div className="app__allemployee_content-header-filter">
              <FaUserTie />
              <Switch
                isToggled={isToggledAdminF}
                onToggle={handleFilterAdmin}
              />
              <RiUser2Fill style={{ fontSize: "19px" }} />
              <Switch
                isToggled={isToggledOperaF}
                onToggle={handleFilterOpera}
              />
              <RiUser2Fill style={{ fontSize: "19px" }} />
              <Switch
                isToggled={isToggledCoachF}
                onToggle={handleFilterCoach}
              />
            </div>
            <RiUserSearchFill className="style_svgg" />
          </div>
          <SnackBar message={message} type={type} ref={snackBarRef} />
          <EmployeeTable
            Data={search(filterEmployee)}
            onSelect={changeFormState}
            onDelete={selectDeleteUser}
          />
          <EditForm open={formOpen} Data={update} onClose={changeStateOpen} />
        </div>
      </div>
      <div className="app__allemployee_schedule-container">
        <div className="app__allemployee_schedule-header">
          <h3 style={{ fontSize: "30px" }}>Employee Schedule </h3>
        </div>
        <div className="app__allemployee_schedule-content">
          <EmployeeSchedule />
        </div>
        <div className="app__allemployee_content-footer">
          <label htmlFor="add-membre" className="app__allemployee_content-lab">
            Add a new Employee(confirmation)
          </label>
          <button id="add-employee-btn" onClick={conditionStateOpen}>
            <FaUserTie className="style-svgg" />
          </button>
          <ConfirmationFormCode
            open={isOpen}
            openn={isOpenn}
            onClose={changeStateOpen}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Employee;
