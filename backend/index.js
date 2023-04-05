require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const user = require("./routes/user");
const post = require("./routes/post");
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require("mongoose");
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.json());
app.use("/users", user);
app.use("/posts", post);

mongoose.connect(MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MongoDB");
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running on", PORT);
  }
});
