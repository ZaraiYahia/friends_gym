const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const postRoutes = require("./Routes/postRoutes");
const getRoutes = require("./Routes/getRoutes");
const updateRoutes = require("./Routes/updateRoutes");
const deleteRoutes = require("./Routes/deleteRoutes");
const mysqlStore = require("express-mysql-session")(session);
const { engine } = require("express-handlebars");
const fileUpload = require("express-fileupload");

const IN_PROD = "development" === "production";

app.engine(
  "hbs",
  engine({
    extname: "hbs",
  })
);
app.set("view engine", " hbs");

app.use(fileUpload());
// console.log(process.env.REACT_APP_DB_PASSWORD);
const options = {
  connectionLimit: 10,
  password: process.env.REACT_APP_DB_PASSWORD,
  user: process.env.REACT_APP_DB_USER,
  database: process.env.REACT_APP_DB_NAME,
  host: process.env.REACT_APP_DB_HOST,
  port: process.env.REACT_APP_DB_PORT,
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

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: process.env.REACT_APP_SESSION_KEY,
    secret: process.env.REACT_APP_SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      sameSite: true,
      secure: IN_PROD,
    },
  })
);

/// use post ROUTES
app.use("/api", postRoutes);
app.use("/api", postRoutes);
app.use("/api", postRoutes);
app.use("/api", postRoutes);
app.use("/api/Employee", postRoutes);
app.use("/api/Employee", postRoutes);
app.use("/api/Employee", postRoutes);
app.use("/api", postRoutes);
app.use("/api", postRoutes);
app.use("/api/Login", postRoutes);
app.use("/api/Logout", postRoutes);

/// use get ROUTES
app.use("/api", getRoutes);
app.use("/api", getRoutes);
app.use("/api", getRoutes);
app.use("/api/getEmployee", getRoutes);
app.use("/api/getEmployee", getRoutes);
app.use("/api/getEmployee", getRoutes);
app.use("/api/get", getRoutes);
app.use("/api/Login", getRoutes);
app.use("/api", getRoutes);

//// use update ROUTES
app.use("/api", updateRoutes);
app.use("/api/put", updateRoutes);
app.use("/api/put", updateRoutes);
app.use("/api/put", updateRoutes);

/// use delete ROUTES
app.use("/api", deleteRoutes);
app.use("/api", deleteRoutes);

app.listen(3001, () => {
  console.log("Hii it's running!!");
});
