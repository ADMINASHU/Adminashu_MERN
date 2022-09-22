const jwt = require("jsonwebtoken");
require("dotenv").config;

const jwtVerify = (req, res, next) => {
  const authHeader = req.header["authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token, 
    process.env.ACCESS_SECRET_KEY, 
    (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.uname = decoded.username;
    next();
  });
};
module.exports = jwtVerify