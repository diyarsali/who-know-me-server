import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
const router = express.Router();

import verifyJWT from "../config/auth.js";
// SIGNUP
router.post("/Signup", (req, res) => {
  let data = req.body;

  User.findOne({ username: data.username }).then((user) => {
    if (user) {
      console.log("user  " + user.username + " is a avaliable");
      res.send({ usedUsername: true });
      return;
    } else {
      let newUser = data;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.log("Failed generating salt bcrypt");
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          // console.log(newUser);
          User.create(newUser, (err, dataUser) => {
            if (err) {
              res.status(500).send(err);
            } else {
              const token = jwt.sign(
                { username: dataUser.username, id: dataUser._id },
                "fdsfdsafdsafdasffdsaf"
              );

              res.status(201).send({
                token: token,
                id: dataUser._id,
                userRegistered: true,
                usedUsername: false,
              });
            }
          });
        });
      });
    }
  });
});

//Login Post
router.post("/login", (req, res, next) => {
  let username = req.body.username;

  let password = req.body.password;

  User.findOne({ username: username }, (err, user) => {
    if (!user) {
      console.log("no user found");
      res.send({ failedLoggingin: true });
      return;
    } else {
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) console.log("password error");
        if (isMatch) {
          console.log("logged in ");
          const token = jwt.sign(
            { username: user.username, id: user._id },
            "fdsfdsafdsafdasffdsaf"
          );

          res.send({ login: true, token, id: user._id });
          // console.log(token);
        } else {
          console.log("wrong password");
          res.send({ failedLoggingin: true });
        }
      });
    }
  });
});

//get all userName

router.post("/getusers", (req, res) => {
  User.find({ username: { $ne: req.body.username } }, (err, user) => {
    res.send(user);
    // console.log(user);
  }).select({ username: 1, name: 1 });
});

// get users by search

// router.post('/getUsers', (req, res) => {
// 	let user = req.body;
// 	let userAuth = req.user.username;
// 	User.find(
// 		{
// 			username: { $ne: userAuth },
// 			$or: [ { username: { $regex: user.username } }, { name: { $regex: user.name } } ]
// 		},
// 		{
// 			_id: 0,
// 			name: 1,
// 			username: 1
// 		},
// 		(err, user) => {
// 			res.send(user);
// 		}
// 	);
// });

// test route for ensuer user is login
router.get("/ensureAuthenticated", verifyJWT, (req, res) => {
  jwt.verify(req.token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.send({ ensureAuthenticated: false, Loading: false });
    } else {
      res.send({ ensureAuthenticated: true, Loading: false, decoded });
      // console.log(req.token);
    }
  });
});

export default router;
