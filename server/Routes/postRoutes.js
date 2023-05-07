const express = require("express");
const router = express.Router();
const session = require("express-session");
const mySQL = require("mysql");

const mysqlStore = require("express-mysql-session")(session);

const options = {
  connectionLimit: 10,
  password: "password",
  user: "root",
  database: "friendsgym",
  host: "localhost",
  port: "3306",
  createDatabaseTable: false,
  schema: {
    tableName: "serversessions",
    columnNames: {
      session_id: "serversession_id",
      expires: "expires",
      data: "sdata",
    },
  },
};

const sessionStore = new mysqlStore(options);

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

router.post("/Registre", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const sex = req.body.sex;
  const address = req.body.address;
  const mailAddress = req.body.mailAddress;
  const confirmCode = req.body.confirmCode;
  const password = req.body.password;
  const registreDate = req.body.registreDate;
  const userName = req.body.userName;
  const phone = req.body.phone;
  const sqlInsert =
    "INSERT INTO membre (first_name,last_name,birth_date,gender,address,mail_address,confirm_code,pass_word,registre_date,user_name,phone) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      firstName,
      lastName,
      birthDate,
      sex,
      address,
      mailAddress,
      confirmCode,
      password,
      registreDate,
      userName,
      phone,
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

router.post("/ConfirmationRegistre", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const gender = req.body.gender;
  const address = req.body.address;
  const mailAddress = req.body.mailAddress;
  const password = req.body.password;
  const userName = req.body.userName;
  const phone = req.body.phone;
  const registration = req.body.registration;
  const subscription = req.body.subscription;
  const cancel = req.body.cancel;
  const typeOfTraining = req.body.typeOfTraining;
  const groupSession = req.body.groupSession;
  const role = req.body.role;
  const sqlquery =
    "INSERT INTO adherent (first_name,last_name,birth_date,gender,address,mail_address,pass_word,user_name,phone,inscription_date,subscription_date,cancel_date,training_type,group_id,role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
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
        phone,
        registration,
        subscription,
        cancel,
        typeOfTraining,
        groupSession,
        role,
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

router.post("/ConfirmationCode", (req, res) => {
  const confirmCode = req.body.confirmCode;
  const sqlSelect = "SELECT * FROM membre WHERE confirm_code = ?";
  db.query(sqlSelect, [confirmCode], (err, result) => {
    if (err) {
      console.log({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ failmessage: "user doesn't exist" });
    }
  });
});
router.post("/AddMembreToGroup", (req, res) => {
  const confirmCode = req.body.confirmCode;
  const sqlSelect = "SELECT * FROM adherent WHERE adherent_id = ?";
  db.query(sqlSelect, [confirmCode], (err, result) => {
    if (err) {
      console.log({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ failmessage: "user doesn't exist" });
    }
  });
});

router.post("/coachRegistration", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const sex = req.body.sex;
  const address = req.body.address;
  const mailAddress = req.body.mailAddress;
  const password = req.body.password;
  const userName = req.body.userName;
  const phone = req.body.phone;
  const startDate = req.body.startDate;
  const contratDuration = req.body.contratDuration;
  const salary = req.body.salary;
  const typeOfCoaching = req.body.typeOfCoaching;
  const role = req.body.role;
  const sqlquery =
    "INSERT INTO coach (first_name,last_name,birth_date,gender,address,mail_address,pass_word,user_name,phone,start_date,contract_duration,specialite_id,salary,role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      sqlquery,
      [
        firstName,
        lastName,
        birthDate,
        sex,
        address,
        mailAddress,
        hash,
        userName,
        phone,
        startDate,
        contratDuration,
        typeOfCoaching,
        salary,
        role,
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

router.post("/operateurRegistration", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const sex = req.body.sex;
  const address = req.body.address;
  const mailAddress = req.body.mailAddress;
  const password = req.body.password;
  const userName = req.body.userName;
  const phone = req.body.phone;
  const startDate = req.body.startDate;
  const contratDuration = req.body.contratDuration;
  const salary = req.body.salary;
  const role = req.body.role;
  const sqlquery =
    "INSERT INTO operateur (first_name,last_name,birth_date,gender,address,mail_address,pass_word,user_name,phone,start_date,contract_duration,salary,role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      sqlquery,
      [
        firstName,
        lastName,
        birthDate,
        sex,
        address,
        mailAddress,
        hash,
        userName,
        phone,
        startDate,
        contratDuration,
        salary,
        role,
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

router.post("/adminRegistration", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const sex = req.body.sex;
  const address = req.body.address;
  const mailAddress = req.body.mailAddress;
  const password = req.body.password;
  const userName = req.body.userName;
  const phone = req.body.phone;
  const startDate = req.body.startDate;
  const contratDuration = req.body.contratDuration;
  const salary = req.body.salary;
  const role = req.body.role;
  const sqlquery =
    "INSERT INTO admin (first_name,last_name,birth_date,gender,address,mail_address,pass_word,user_name,phone,start_date,contract_duration,salary,role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      sqlquery,
      [
        firstName,
        lastName,
        birthDate,
        sex,
        address,
        mailAddress,
        hash,
        userName,
        phone,
        startDate,
        contratDuration,
        salary,
        role,
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

router.post("/createGroup", (req, res) => {
  const id = req.body.id;
  const groupName = req.body.groupName;
  const groupCoach = req.body.groupCoach;
  const totalMembre = req.body.totalMembre;
  const typeOfGroup = req.body.typeOfGroup;
  const sqlquery =
    "INSERT INTO groupes (group_id,group_name,nombre_place,coach_id,group_cat_id) VALUES (?,?,?,?,?)";
  db.query(
    sqlquery,
    [id, groupName, totalMembre, groupCoach, typeOfGroup],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/createSession", (req, res) => {
  const start1 = req.body.session1_S;
  const end1 = req.body.session1_E;
  const start2 = req.body.session2_S;
  const end2 = req.body.session2_E;
  const start3 = req.body.session3_S;
  const end3 = req.body.session3_E;
  const start4 = req.body.session4_S;
  const end4 = req.body.session4_E;
  const groupId = req.body.group_id;
  const locals = req.body.locals;
  const sqlquery =
    "INSERT INTO sessions (starte_date_h,end_date_h,group_id,locals) VALUES (?,?,?,?)";
  if (start1 && end1) {
    db.query(sqlquery, [start1, end1, groupId, locals], (err, result) => {
      console.log(err);
    });
  }
  if (start2 && end2) {
    db.query(sqlquery, [start2, end2, groupId, locals], (err, result) => {
      console.log(err);
    });
  }
  if (start3 && end3) {
    db.query(sqlquery, [start3, end3, groupId, locals], (err, result) => {
      console.log(err);
    });
  }
  if (start4 && end4) {
    db.query(sqlquery, [start4, end4, groupId, locals], (err, result) => {
      console.log(err);
    });
  }
  res.send({ message: "Session has been created " });
});

router.post("/AddEvent", (req, res) => {
  const title = req.body.title;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const eventSite = req.body.eventSite;
  const groupId = req.body.groupId;
  const locals = req.body.locals;
  if (groupId) {
    const sqlquery =
      "INSERT INTO sessions (starte_date_h,end_date_h,site,group_id,title,locals) VALUES (?,?,?,?,?,?)";
    db.query(
      sqlquery,
      [startDate, endDate, eventSite, groupId, title, locals],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    const sqlquery =
      "INSERT INTO sessions (starte_date_h,end_date_h,site,title,locals) VALUES (?,?,?,?,?)";
    db.query(
      sqlquery,
      [startDate, endDate, eventSite, title, locals],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  }
});

/*router.post("/Adherent", (req, res) => {
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  const sqlquery = "SELECT * FROM adherent WHERE user_name= ?";
  db.query(sqlquery, userName, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(passWord, result[0].pass_word, (error, response) => {
        if (response) {
          res.send(result);
        } else {
          res.send({ message: "worng username/password combination !!" });
        }
      });
    } else {
      res.send({ message: "user doesn't exist" });
    }
  });
});*/

router.post("/User", (req, res) => {
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  const sqlquery =
    "SELECT adherent.adherent_id AS user_id,adherent.first_name,adherent.last_name,adherent.birth_date,adherent.gender,adherent.mail_address,adherent.pass_word,adherent.user_name,adherent.address,adherent.phone,adherent.subscription_date,adherent.cancel_date,adherent.training_type,adherent.weight,adherent.size,adherent.programme_id,adherent.diet_id,adherent.group_id,adherent.role AS ROLE,'ADHERENT' AS designation,profil_picture FROM adherent WHERE user_name=? UNION ALL SELECT operateur.oper_id,operateur.first_name,operateur.last_name,operateur.birth_date,operateur.gender,operateur.mail_address,operateur.pass_word,operateur.user_name,operateur.address,operateur.phone,operateur.start_date,operateur.contract_duration,'dumyvalue','dumyvalue','dumyvalue','dumyvalue','dumyvalue','dumyvalue',operateur.role AS ROLE,'OPERATEUR',profil_picture FROM operateur WHERE user_name=? UNION ALL SELECT coach.coach_id,coach.first_name,coach.last_name,coach.birth_date,coach.gender,coach.mail_address,coach.pass_word,coach.user_name,coach.address,coach.phone,coach.start_date,coach.contract_duration,'dumyvalue','dumyvalue','dumyvalue','dumyvalue','dumyvalue','dumyvalue',coach.role AS ROLE,coach_specialite.designation,profil_picture FROM coach JOIN coach_specialite ON coach.specialite_id = coach_specialite.specialite_id WHERE user_name=? UNION ALL SELECT admin.admin_id,admin.first_name,admin.last_name,admin.birth_date,admin.gender,admin.mail_address,admin.pass_word,admin.user_name,admin.address,admin.phone,admin.start_date,admin.contract_duration,'dumyvalue','dumyvalue','dumyvalue','dumyvalue','dumyvalue','dumyvalue',admin.role AS ROLE,'ADMINISTRATEUR',profil_picture FROM admin WHERE user_name=?";
  db.query(
    sqlquery,
    [userName, userName, userName, userName],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(passWord, result[0].pass_word, (error, response) => {
          if (response) {
            req.session.user = result;
            res.send(req.session.user);
          } else {
            res.send({
              almostmessage: "Worng Username/Password combination",
            });
          }
        });
      } else {
        res.send({ failmessage: "User Doesn't Exist" });
      }
    }
  );
});

router.post("/userlogout", (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    if (err) {
      return res.redirect("/Admin");
    }
    sessionStore.close();
    res.clearCookie("userId");
    res.send("/Login");
  });
});

router.post("/UserImage", (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  let sampleFile;
  let uploadPath;
  const sqlquery = "UPDATE operateur SET profil_picture=? WHERE oper_id=?";
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.send("No file were uploaded");
  }
  sampleFile = req.files.imageUploaded;
  uploadPath = __dirname + "/upload/" + sampleFile.name;
  sampleFile.mv(uploadPath, (err) => {
    if (err) return console.log(err);
    ////   res.send("File updated");
    db.query(sqlquery, [sampleFile.name, userId], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
});

router.post("/upload/ProgrammeAndDiet", (req, res) => {
  const docName = req.body.docName;
  const docCoach = req.body.docCoach;
  const docCoategorie = req.body.docCoategorie;
  let sampleFile;
  let uploadPath;
  const sqlquery =
    "INSERT INTO documents (doc_name,doc_url,writen_by,doc_categorie) VALUES (?,?,?,?)";
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.send("No file were uploaded");
  }
  sampleFile = req.files.docUrl;
  uploadPath = __dirname + "/File/" + sampleFile.name;
  sampleFile.mv(uploadPath, (err) => {
    if (err) return console.log(err);
    ////   res.send("File updated");
    db.query(
      sqlquery,
      [docName, sampleFile.name, docCoach, docCoategorie],
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

router.post("/Download", (req, res) => {
  const docUrl = req.body.docUrl;
  res.download(__dirname + "/File/" + docUrl);
});

module.exports = router;
