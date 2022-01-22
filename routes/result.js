import express from "express";
// import Result from "../models/result/.js";
import Result from "../models/result.js";
const router = express.Router();

import User from "../models/user.js";

// result saving
router.post("/add", async (req, res) => {
  let recieverID = req.body.recieverID;
  let answearUsername = req.body.answearUsername;
  let RightAnswer = req.body.RightAnswer;
  // console.log(RightAnswer);

  if (recieverID.match(/^[0-9a-fA-F]{24}$/)) {
    const user = await User.find({ _id: recieverID });
    const username = user[0].username;
    // console.log(username);

    const result = await Result.find({
      user: username,
      answearUsername: answearUsername,
    });
    if (result.length === 0) {
      Result.create(
        {
          user: username,
          answearUsername: answearUsername,
          rightAnswers: RightAnswer,
        },
        (err) => {
          if (err) {
            console.log("Error saving Result into mongo");
            return;
          }
          console.log("Result created succussfully!");
        }
      );
    } else {
      Result.updateOne(
        {
          user: username,
          answearUsername: answearUsername,
        },
        { $push: { rightAnswers: RightAnswer } },
        (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("updated result");
          return;
        }
      );
    }
  }
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
