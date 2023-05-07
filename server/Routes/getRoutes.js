const express = require("express");
const router = express.Router();
const mySQL = require("mysql");
const { Routes } = require("react-router-dom");
const session = require("express-session");

const db = mySQL.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "password",
  database: "friendsgym",
  connectionLimit: 10,
});

router.get("/getMembre", (req, res) => {
  const sqlquery = "SELECT * FROM membre";
  db.query(sqlquery, (err, result) => {
    res.send(result);
  });
});

router.get("/getAdherents", (req, res) => {
  const sqlquery =
    "SELECT adherent.adherent_id,adherent.first_name,adherent.last_name,adherent.mail_address,adherent.address,adherent.birth_date,adherent.gender,adherent.phone,adherent.inscription_date,adherent.subscription_date,adherent.cancel_date,adherent.training_type,groupes.group_name,P.doc_name AS progrem_name,D.doc_name AS diet_name FROM adherent LEFT JOIN groupes ON adherent.group_id = groupes.group_id LEFT JOIN documents P ON adherent.programme_id = P.doc_id LEFT JOIN documents D ON adherent.diet_id = D.doc_id ";
  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.get("/Employees", (req, res) => {
  const sqlquerycoach =
    "SELECT coach.coach_id AS employee_id,coach.first_name,coach.last_name,coach.birth_date,coach.gender,coach.mail_address,coach.address,coach.phone,coach.start_date,coach.contract_duration,coach_specialite.designation,coach.role FROM coach JOIN coach_specialite ON coach.specialite_id = coach_specialite.specialite_id UNION ALL SELECT admin.admin_id,admin.first_name,admin.last_name,admin.birth_date,admin.gender,admin.mail_address,admin.address,admin.phone,admin.start_date,admin.contract_duration,'Admin',admin.role FROM admin UNION ALL SELECT operateur.oper_id,operateur.first_name,operateur.last_name,operateur.birth_date,operateur.gender,operateur.mail_address,operateur.address,operateur.phone,operateur.start_date,operateur.contract_duration,'Operateur',operateur.role FROM operateur";
  db.query(sqlquerycoach, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.get("/AllCoachs", (req, res) => {
  const sqlquery = "SELECT coach_id,first_name,last_name FROM coach";

  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.get("/Groupes", (req, res) => {
  const sqlquery =
    "SELECT groupes.group_id,groupes.group_name,groupes.nombre_place,coach.coach_id,coach.first_name,coach.last_name,coach.phone,coach.mail_address,group_categories.designation_cat,groupes.group_cat_id FROM groupes LEFT JOIN coach ON groupes.coach_id = coach.coach_id JOIN group_categories ON groupes.group_cat_id= group_categories.group_cat_id";

  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.get("/Allgroupes", (req, res) => {
  const sqlquery = "SELECT group_id,group_name FROM groupes";

  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.get("/Sessions", (req, res) => {
  const sqlquery =
    "SELECT sessions.session_id,sessions.starte_date_h,sessions.end_date_h,groupes.group_name,groupes.nombre_place,group_categories.designation_cat,coach.first_name,coach.last_name FROM sessions  JOIN groupes ON sessions.group_id = groupes.group_id  JOIN group_categories ON groupes.group_cat_id = group_categories.group_cat_id  JOIN coach ON groupes.coach_id = coach.coach_id WHERE sessions.locals = 0";
  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.get("/AllSessions/Coach", (req, res) => {
  const sqlquery =
    "SELECT sessions.session_id,sessions.starte_date_h,sessions.end_date_h,sessions.title,sessions.locals,coach.first_name,coach.last_name FROM sessions JOIN groupes ON sessions.group_id = groupes.group_id  JOIN group_categories ON groupes.group_cat_id = group_categories.group_cat_id JOIN coach ON groupes.coach_id = coach.coach_id WHERE sessions.locals = 1";
  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.get("/AllSessions", (req, res) => {
  const sqlqueryevent =
    "SELECT sessions.session_id,sessions.starte_date_h,sessions.end_date_h,sessions.site,sessions.title,sessions.locals FROM sessions WHERE sessions.locals = 1 AND sessions.group_id IS NULL";
  db.query(sqlqueryevent, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.get("/AllLocalSessions", (req, res) => {
  const sqlqueryevent =
    "SELECT sessions.session_id,sessions.starte_date_h,sessions.end_date_h,sessions.site,sessions.title,sessions.locals,groupes.group_name FROM sessions JOIN groupes ON sessions.group_id = groupes.group_id  WHERE locals = 1";
  db.query(sqlqueryevent, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.get("/getUsers", (req, res) => {
  const sqlquery =
    "SELECT admin.user_name AS userName FROM admin UNION ALL SELECT operateur.user_name FROM operateur UNION ALL SELECT coach.user_name FROM coach UNION ALL SELECT adherent.user_name FROM adherent";
  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.get("/Documents", (req, res) => {
  const sqlquery =
    "SELECT documents.doc_id,documents.doc_name,documents.doc_url,coach.first_name,coach.last_name,doc_categories.designation FROM documents JOIN coach ON documents.writen_by = coach.coach_id JOIN doc_categories ON documents.doc_categorie = doc_categories.doc_cat_id AND documents.doc_categorie != 4";

  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.get("/DocumentsDiets", (req, res) => {
  const sqlquery =
    "SELECT documents.doc_id,documents.doc_name,documents.doc_url,coach.first_name,coach.last_name,doc_categories.designation FROM documents JOIN coach ON documents.writen_by = coach.coach_id JOIN doc_categories ON documents.doc_categorie = doc_categories.doc_cat_id WHERE documents.doc_categorie = 4";

  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.get("/Administrateur", (req, res) => {
  let sess = req.session;
  /*console.log(sess);*/
  if (sess.user) {
    res.send({ loggedIn: true, user: sess.user });
  } else {
    res.send({ loggedIn: false });
  }
});

module.exports = router;
