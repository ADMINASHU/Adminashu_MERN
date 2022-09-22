const express = require("express");
const route = express.Router();
route.use(express.json());
const userModel = require("./userSchema");
const cors = require("cors");
route.use(cors());
const bcrypt = require("bcryptjs");

route.post("/register", async (req, res) => {
  const { uname, email, password, cPassword } = req.body;
  if (!uname || !email || !password || !cPassword)
    return res.status(400).json({ error: "please fill all field" });

  if (password != cPassword)
    return res.status(412).json({ error: "Confirm password not matched" });

  try {
    const userExist = await userModel.findOne({ uname: uname });
    if (userExist) return res.status(409).json({ error: "User already exist" });
    const user = new userModel({ uname, email, password });
    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User registration failed" });
  }
});

route.post("/signin", async (req, res) => {
  try {
    const { uname, password } = req.body;

    if (!uname || !password) {
      return res.status(400).json("Please fill all field");
    }
    const dbUser = await userModel.findOne({ email: email });
    if (dbUser) {
      const isMatch = await bcrypt.compare(password, dbUser.password);
      if (!isMatch) {
        return res.status(400).json("invalid credentials");
      } else {
        const { uname, email, password, cPassword } = dbUser;
        const UserData = { uname, email };
        return res.status(200).json(UserData);
        // send user data to front-end
      }
    } else {
      return res.status(400).json("invalid credentials");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
