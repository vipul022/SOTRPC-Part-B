const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const userRouter = require("./routes/user_routes");
<<<<<<< HEAD
const MongoStore = require("connect-mongo")(session);
=======
const classRouter = require("./routes/pottery_classes_routes");
const MongoStore = require("connect-mongo")(session)
>>>>>>> b5dc04bf6b8d3d11c85f1d666b83155deec93e8d
const passport = require("passport");

const port = 3001;

const app = express();

app.use(express.json());
<<<<<<< HEAD
app.use(
  express.urlencoded({
    extended: true,
  })
);
const whitelist = ["http://localhost:3000"];
app.use(
  cors({
=======
app.use(express.urlencoded({
    extended: true
}));
const whitelist = ["http://localhost:3001"]
app.use(cors({
>>>>>>> b5dc04bf6b8d3d11c85f1d666b83155deec93e8d
    credentials: true,
    origin: function (origin, callback) {
      // Check each url in whitelist and see if it includes the origin (instead of matching exact string)
      const whitelistIndex = whitelist.findIndex((url) => url.includes(origin));
      console.log("found whitelistIndex", whitelistIndex);
      callback(null, whitelistIndex > -1);
    },
  })
);

<<<<<<< HEAD
app.use(
  session({
=======
app.use(session({
>>>>>>> b5dc04bf6b8d3d11c85f1d666b83155deec93e8d
    secret: "star wars a new hope", // put this in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1800000,
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

// Database connection
const dbConn = process.env.MONGODB_URI || "mongodb://localhost/SOTRPC";
<<<<<<< HEAD
mongoose.connect(
  dbConn,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log("Error connecting to database", err);
    } else {
      console.log("Connected to database", dbConn);
    }
  }
);
=======
mongoose.connect(dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err) => {
        if (err) {
            console.log("Error connecting to database", err);
        } else {
            console.log("Connected to database", dbConn);
        }
});
>>>>>>> b5dc04bf6b8d3d11c85f1d666b83155deec93e8d

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");
<<<<<<< HEAD

//Routes
app.use("/users", userRouter);

// Home page test
app.get("/", (req, res) => {
  // req.session.views = req.session.views? req.session.views +1 : 1;
  // res.json(req.session.views)
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`SOTRPC app listening on port ${port}`);
});
=======


//Routes
app.use("/users", userRouter);
app.use("/classes", classRouter);

// Home page test
app.get("/", (req, res) => {
    // req.session.views = req.session.views? req.session.views +1 : 1;
    // res.json(req.session.views)
    res.send("Welcome")
})


app.listen(port, () => {
    console.log("SOTRPC app listening on port ${port}")
})
>>>>>>> b5dc04bf6b8d3d11c85f1d666b83155deec93e8d
