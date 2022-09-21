const express = require("express");
const route = express.Router();
route.use(express.json());
const userModel = require("./userSchema");
const cors = require("cors");
route.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

      const token = await user.generateAuthToken();
      res.cookie("AuthToken", token, {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      });
      console.log("SignUp_token: " + token);

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
      return res.status(400).json("Please fill all field");
    }
    const dbUser = await userModel.findOne({ email: email });

    const token = await dbUser.generateAuthToken();
    res.cookie("AuthToken", token);
    console.log("logtoken: " + token);

    if (dbUser) {
      const isMatch = await bcrypt.compare(password, dbUser.password);

      // console.log("cookie: " + cookie);

      if (!isMatch) {
        return res.status(400).json("invalid credentials");
      } else {
        const { uname, email, password, cPassword } = dbUser;
        const UserData = { uname, email };
        res.status(200).json(UserData);
        // const token = await dbUser.generateAuthToken();
        // return res.cookie("token", token, {
        //   expires: new Date(Date.now() + 86400000),
        //   httpOnly: true,
        // });
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
