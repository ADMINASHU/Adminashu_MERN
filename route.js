const express = require("express");
const route = express.Router();
route.use(express.json());
const userModel = require("./userSchema");
const cors = require("cors");
route.use(cors());

route.post("/register", async (req, res) => {
  const { uname, email, password, cPassword } = req.body;
  if (!uname || !email || !password || !cPassword) {
    return res.status(422).json({ "error": "please fill all field" });
  }
  try {
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ "error": "User already exist" });
    }
    const user = new userModel({ uname, email, password });
    const result = await user.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

route.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Please fill all field");
    }
    const dbUser = await userModel.findOne({ email: email });
    if (dbUser.password === password) {
      return res.status(200).json(dbUser);
    } else {
      return res.status(400).send("invalid credential");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
