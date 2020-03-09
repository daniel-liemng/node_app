const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", err => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database Connection Established!");
});

// App
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
