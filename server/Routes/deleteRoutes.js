const express = require("express");
const router = express.Router();
const mySQL = require("mysql");

const db = mySQL.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "password",
  database: "friendsgym",
  connectionLimit: 10,
});

router.delete("/DeleteMembre/:onDelete", (req, res) => {
  const id = req.params.onDelete;
  const sqlquery = "DELETE FROM adherent WHERE adherent_id=?";
  db.query(sqlquery, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.delete("/DeleteCoach/:onDelete", (req, res) => {
  const id = req.params.onDelete;
  const sqlquery = "DELETE FROM coach WHERE coach_id=?";
  db.query(sqlquery, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.delete("/DeleteAdmin/:onDelete", (req, res) => {
  const id = req.params.onDelete;
  const sqlquery = "DELETE FROM admin WHERE admin_id=?";
  db.query(sqlquery, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
router.delete("/DeleteOperateur/:onDelete", (req, res) => {
  const id = req.params.onDelete;
  const sqlquery = "DELETE FROM operateur WHERE oper_id=?";
  db.query(sqlquery, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
router.delete("/DeleteGroup/:onDelete", (req, res) => {
  const id = req.params.onDelete;
  const sqlquery = "DELETE FROM groupes WHERE group_id=?";
  db.query(sqlquery, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.delete("/DeleteDocument/:onDelete", (req, res) => {
  const id = req.params.onDelete;
  const sqlquery = "DELETE FROM documents WHERE doc_id=?";
  db.query(sqlquery, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
