const express = require("express");
const cors = require("cors");
let billingAPI = require("./controller/Billing");
let storageAPI = require("./controller/Storage");
const app = express();
let bodyParser = require("body-parser");
// let mongoose = require("mongoose");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// mongoose.connect("mongodb://localhost/SalarySlip", { useNewUrlParser: true });
// var db = mongoose.connection;

// // Added check for DB connection
// if (!db) console.log("Error connecting db");
// else console.log("Db connected successfully");
app.use(bodyParser.json());
app.use(cors());
var port = process.env.PORT || 9000;
// app.get("/", (req, res) => res.send("Its Working!!"));
// app.use("/init", API);
app.use("/billing", billingAPI);
app.use("/storage", storageAPI);

app.listen(port, function () {
  console.log("Server Started Now!!");
});
