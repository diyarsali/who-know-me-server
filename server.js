import express from "express";
import mongoose from "mongoose";
import questionRoute from "./routes/question.js";
import userRoute from "./routes/user.js";
import resultRoute from "./routes/result.js";
import Cors from "cors";

import "dotenv/config";
const app = express();
const port = process.env.PORT || 8000;
//connect MongoDB

const connections_url = `mongodb+srv://diyarsali:diyarsali123@cluster0.dvfal.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(connections_url, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});
//Get the default connection
var db = mongoose.connection;

// MiddleWare
app.use(express.json());
app.use(Cors());

app.get("/", (req, res) => {
  res.status(200).send("im backend");
});

app.use("/question", questionRoute);
app.use("/users", userRoute);
app.use("/result", resultRoute);

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.listen(port, () => console.log(`server is running on port${port}`));
