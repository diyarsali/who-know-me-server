import Jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const info = req.headers["x-access-token"];
  console.log(info);
  if (!info) {
    res.send("no token is created");
  } else {
    req.token = info;
    next();
  }
};

export default verifyJWT;
