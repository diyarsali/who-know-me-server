import express from "express";
// import Result from "../models/result/.js";
import Result from "../models/result.js";
const router = express.Router();

import User from "../models/user.js";

// result saving
router.post("/add", (req, res) => {
  let recieverID = req.body.recieverID;
  console.log(recieverID);
});

// to ensure user is answering to another user
router.post("/getResult", (req, res) => {
  let recieverID = req.body.recieverID;
  let answearUsername = req.body.answearUsername;
  console.log(answearUsername);
  if (recieverID.match(/^[0-9a-fA-F]{24}$/)) {
    User.findById(recieverID, function (err, user) {
      if (err) {
        console.log(err);
      }
      Result.find(
        {
          user: user.username,
          answearUsername: answearUsername,
        },
        (err, data) => {
          res.send(data[0]);
        }
      );
    });
  }
});

// router.post("/getResultToResult", (req, res) => {
//   Result.find({ user: req.body.username }, (err, data) => {
//     res.send(data);
//     console.log(data);
//   });
// });

export default router;
