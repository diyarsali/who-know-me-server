import express from "express";
import Question from "../models/question.js";
import Result from "../models/result.js";
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
      res.status(500).send(err);
      console.log(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// router.get('/up', (req, res) => {
// 	console.log('no');

// 	Question.updateOne(
// 		{
// 			user: 'diyar',
// 			question: 'no'
// 		},
// 		{
// 			question: 'yes'
// 		},
// 		function(err, result) {
// 			if (err) {
// 				res.send(err);
// 			} else {
// 				// console.log('update');
// 				console.log(result);
// 				// res.send(result);
// 			}
// 		}
// 	);
// });

// get question to auth user
router.post("/getAll", (req, res) => {
  const user = req.body.username;
  Question.find({ user: user }, (err, question) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(question);
      res.send(question);
    }
  });
});
//get question to answer component by id
router.post("/getQuestion", (req, res) => {
  // let id = mongoose.Types.ObjectId(req.body.authID);

  let id = req.body.authID;
  // console.log(id);
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    User.findById(id, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        // console.log('Result : ', user.username);
        Question.find({ user: user.username }, (err, question) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(question);
            res.send({ question: question, AnsweringTo: user.username });
          }
        });
      }
    });
  }
});
// get question to answer
router.post("/Qan", (req, res) => {
  let userAuth = req.body.userAuth;
  let questionOwner = req.body.questionOwner;
  let rightAnswer = req.body.rightAnswer;
  Question.find({ user: questionOwner }, (err, question) => {
    if (err) {
      console.log(err);
    } else {
      // do something
      console.log("hellow");
    }
  });
});

// delete all question

router.post("/deleteAll", (req, res) => {
  console.log(req.body.username);
  Question.deleteMany({ user: req.body.username })
    .then(function () {
      Result.deleteMany({ user: req.body.username }).then(() => {
        console.log("Result deleted"); // Success
      });
      console.log("Question deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});

// router.post("/update", (req, res) => {
//   console.log("new " + req.body.question);
//   console.log("old " + req.body.previousQuestion);
//   console.log(req.body.username);
//   Question.updateOne(
//     {
//       user: req.body.username,
//       question: req.body.previousQuestion,
//     },
//     {
//       question: req.body.question,
//       answerA: req.body.answerA,
//       answerB: req.body.answerB,
//       answerC: req.body.answerC,
//       answerD: req.body.answerD,
//       rightAnswer: req.body.realAnswer,
//     },
//     function (err, result) {
//       if (err) {
//         res.send(err);
//       } else {
//         // console.log('update');
//         console.log(result);
//         // res.send(result);
//       }
//     }
//   );
// });
export default router;
