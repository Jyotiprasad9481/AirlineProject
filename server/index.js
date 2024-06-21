const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.port || 8080;
const userRoute = require("./routes/user-route");
const cors = require("cors");

mongoose.connect(
  // "mongodb://kishor:1234@localhost:27017/sethu?authSource=admin",
  // "mongodb+srv://user:MnAsjkfkR8LorxMS@user-details.ahxlham.mongodb.net/UserDatabase1",
  "mongodb+srv://user:MnAsjkfkR8LorxMS@cluster0.ymucnpp.mongodb.net/UserDatabase1",
  // "mongodb://localhost:27017/UserDatabase",
  {
    useNewUrlParser: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("Db connection issue", err);
    } else {
      console.log("Db is connected");
    }
  }
);

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({ limit: "500mb" }));

app.use(cors());
app.use("/user", userRoute);
app.listen(port, () => {
  console.log("server is connect:", port);
});
