import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import dotenv from "dotenv";
import User from "./models/user.js";
dotenv.config();

import questionRoute from "./routes/question.js";
import userRoute from "./routes/user.js";
import resultRoute from "./routes/result.js";
const app = express();
const port = process.env.PORT || 8000;
//connect MongoDB
// process.env.TOKEN_SECRET
const connections_url = `mongodb+srv://diyarsali:${process.env.DBSECRET}@cluster0.dvfal.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(connections_url, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});
//Get the default connection
var db = mongoose.connection;

// MiddleWare
app.use(express.json());
app.use(Cors());

// app.use("/", (req, res) => {
//   res.send("hellow hellow worlds");
// });
app.get("/", (req, res) => {
  User.find((err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(data);
  });
});

app.use("/question", questionRoute);
app.use("/users", userRoute);
app.use("/result", resultRoute);

db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.listen(port, () => console.log(`server is running on port ${port}`));
