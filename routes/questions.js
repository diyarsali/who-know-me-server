import express from "express";
import Question from "../models/question.js";
// import Result from "../models/result.js";
import User from "../models/user.js";
const router = express.Router();
//  import jwt from  'jsonwebtoken';
// saving question
router.post("/save", (req, res) => {
  // console.log(req.body);
  var questionAdd = req.body;
  // console.log(questionAdd);

  Question.create(questionAdd, (err, data) => {
    if (err) {
      res.status(500).send(err)
    console.log(err)}
    else {res.status(201).send(data)}
  });
});

export default router;
