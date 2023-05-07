const express = require("express");
const router = express.Router();
const mySQL = require("mysql");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = mySQL.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "password",
  database: "friendsgym",
  connectionLimit: 10,
});

router.put("/confirmGroup", (req, res) => {
  const groupSession = req.body.groupSession;
  const id = req.body.id;
  const sqlquery = "UPDATE adherent SET group_id=? WHERE adherent_id= ?";
  db.query(sqlquery, [groupSession, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/EditMembre", (req, res) => {
  const id = req.body.iD;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const gender = req.body.gender;
  const address = req.body.address;
  const mailAddress = req.body.mailAddress;
  const password = req.body.password;
  const userName = req.body.userName;
  const subscription = req.body.subscription;
  const cancel = req.body.cancel;
  const typeOfTraining = req.body.typeOfTraining;
  const groupSession = req.body.groupSession;
  const sqlquery =
    "UPDATE adherent SET first_name=?,last_name=?,birth_date=?,gender=?,address=?,mail_address=?,pass_word=?,user_name=?,subscription_date=?,cancel_date=?,training_type=?,group_id=? WHERE adherent_id =?";
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query(
      sqlquery,
      [
        firstName,
        lastName,
        birthDate,
        gender,
        address,
        mailAddress,
        hash,
        userName,
        subscription,
        cancel,
        typeOfTraining,
        groupSession,
        id,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});

router.put("/EditCoach", (req, res) => {
  const id = req.body.iD;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const gender = req.body.gender;
  const address = req.body.address;
  const mailAddress = req.body.mailAddress;
  const password = req.body.password;
  const userName = req.body.userName;
  const startDate = req.body.startdate;
  const contractDuration = req.body.contractduration;
  const typeOfCoaching = req.body.typeofcoaching;
  const salary = req.body.salary;
  const sqlquery =
    "UPDATE coach SET first_name=?,last_name=?,birth_date=?,gender=?,address=?,mail_address=?,pass_word=?,user_name=?,start_date=?,contract_duration=?,specialite_id=?,salary=? WHERE coach_id =?";
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query(
      sqlquery,
      [
        firstName,
        lastName,
        birthDate,
        gender,
        address,
        mailAddress,
        hash,
        userName,
        startDate,
        contractDuration,
        typeOfCoaching,
        salary,
        id,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});
router.put("/EditOperateur", (req, res) => {
  const id = req.body.iD;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const gender = req.body.gender;
  const address = req.body.address;
  const mailAddress = req.body.mailAddress;
  const password = req.body.password;
  const userName = req.body.userName;
  const startDate = req.body.startdate;
  const contractDuration = req.body.contractduration;
  const salary = req.body.salary;
  const sqlquery =
    "UPDATE operateur SET first_name=?,last_name=?,birth_date=?,gender=?,address=?,mail_address=?,pass_word=?,user_name=?,start_date=?,contract_duration=?,salary=? WHERE oper_id =?";
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query(
      sqlquery,
      [
        firstName,
        lastName,
        birthDate,
        gender,
        address,
        mailAddress,
        hash,
        userName,
        startDate,
        contractDuration,
        salary,
        id,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});
router.put("/EditAdminn", (req, res) => {
  const id = req.body.iD;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const gender = req.body.gender;
  const address = req.body.address;
  const mailAddress = req.body.mailAddress;
  const password = req.body.password;
  const userName = req.body.userName;
  const startDate = req.body.startdate;
  const contractDuration = req.body.contractduration;
  const salary = req.body.salary;
  const sqlquery =
    "UPDATE admin SET first_name=?,last_name=?,birth_date=?,gender=?,address=?,mail_address=?,pass_word=?,user_name=?,start_date=?,contract_duration=?,salary=? WHERE admin_id =?";
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query(
      sqlquery,
      [
        firstName,
        lastName,
        birthDate,
        gender,
        address,
        mailAddress,
        hash,
        userName,
        startDate,
        contractDuration,
        salary,
        id,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});

router.put("/EditGroup", (req, res) => {
  iD = req.body.iD;
  groupName = req.body.groupName;
  totalPlaces = req.body.totalPlaces;
  groupCoach = req.body.groupCoach;
  typeOfGroup = req.body.typeOfGroup;
  const sqlquery =
    "UPDATE groupes SET group_name=?,nombre_place=?,coach_id=?,group_cat_id=? WHERE group_id=?";
  db.query(
    sqlquery,
    [groupName, totalPlaces, groupCoach, typeOfGroup, iD],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.put("/SendDocument", (req, res) => {
  id = req.body.id;
  programmeId = req.body.programmeId;
  const sqlquery = "UPDATE adherent SET programme_id=? WHERE adherent_id=?";
  db.query(sqlquery, [programmeId, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/SendDocumentDiets", (req, res) => {
  id = req.body.id;
  dietId = req.body.dietId;
  const sqlquery = "UPDATE adherent SET diet_id=? WHERE adherent_id=?";
  db.query(sqlquery, [dietId, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
module.exports = router;
