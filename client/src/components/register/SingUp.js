import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.scss";
import bgImage from "../../assets/images/register.svg";
import { ReactComponent as UserImg } from "../../assets/images/user.svg";
import { ReactComponent as EmailImg } from "../../assets/images/email.svg";
import { ReactComponent as PassImg } from "../../assets/images/pass.svg";

const SignUp = () => {
  let userObj = {
    uname: "",
    email: "",
    password: "",
    cPassword: "",
  };
  const [user, setUser] = useState(() => userObj);
  const priColor = "#040480";
  const navigate = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const { uname, email, password, cPassword } = user;
  const submitSignUp = async () => {
    try {
      const sendData = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await sendData.json();
      if (result) {
        setUser(userObj);
        navigate("/logIn");
      }
    } catch (error) {
      console.log(error);
      navigate("/signUp");
    }
  };

  return (
    <div className="signUpPage">
      <div className="signUpForm">
        <h1>SignUp</h1>
        <div className="inputBox">
          <UserImg fill={priColor} height="16" />
          <input
            className="input"
            type="text"
            placeholder="Name"
            name="uname"
            value={uname}
            autoComplete="false"
            required
            onChange={handleInput}
          />
        </div>
        <div className="inputBox">
          <EmailImg fill={priColor} height="16" />
          <input
            className="input"
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            autoComplete="false"
            required
            onChange={handleInput}
          />
        </div>
        <div className="inputBox">
          <PassImg fill={priColor} height="16" />
          <input
            className="input"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            autoComplete="false"
            required
            onChange={handleInput}
          />
        </div>
        <div className="inputBox">
          <PassImg fill={priColor} height="16" />
          <input
            className="input"
            type="text"
            placeholder="Confirm Password"
            name="cPassword"
            value={cPassword}
            autoComplete="false"
            required
            onChange={handleInput}
          />
        </div>

        <button
          className="btn btn-signUp"
          type="submit"
          onClick={() => submitSignUp()}
        >
          SignUp
        </button>
      </div>
      <div className="signUpImage">
        <img src={bgImage} alt="Register" />
      </div>
    </div>
  );
};

export default SignUp;
