const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const express = require("express");
const app = express();
const cors = require("cors");

const session = require("express-session");

const MongoDbStore = require("connect-mongo");
const http = require("http").Server(app);

const PORT = process.env.PORT || 4000;

//Database connection
require("./db/conn");

//session store
let mongoStore = new MongoDbStore({
  mongoUrl: process.env.DB,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.COOKIES_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24hours
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

require("./routes/web")(app);

var server = http.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});
