const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  uname: String,
  email: String,
  password: String,
  tokens: [
    {
      token: String,
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token
  } catch (error) {
    console.log(error);
  }
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
