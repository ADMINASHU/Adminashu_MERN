const express = require("express");
const route = express.Router();
route.use(express.json());
const userModel = require("./userSchema");
const cors = require("cors");
route.use(cors());

route.post("/register", async (req, res) => {
  const { uname, email, password, cPassword } = req.body;
  if (!uname || !email || !password || !cPassword) {
    return res.status(400).json({ error: "please fill all field" });
  } else if (password != cPassword) {
    return res.status(412).json({ error: "Confirm password not matched" });
  } else {
    try {
      const userExist = await userModel.findOne({ email: email });
      if (userExist) {
        return res.status(422).json({ error: "User already exist" });
      }

      const user = new userModel({ uname, email, password });

      await user.save();
      return res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "User registration failed" });
    }
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
