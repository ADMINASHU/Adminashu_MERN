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
  const submitSignUp = async (e) => {
    e.preventDefault();

  
  };

  return (
    <div className="signUpPage">
      <form method="post" onSubmit={submitSignUp} className="signUpForm" id="signUpForm" >
        <h1>SignUp</h1>
        <div className="inputBox">
          <UserImg fill={priColor} height="16" />
          <input
            className="input"
            type="text"
            placeholder="Name"
            name="uname"
            value={uname}
            autoComplete="none" 
            required
            onChange={handleInput}
          />
        </div>
        <div className="inputBox">
          <EmailImg fill={priColor} height="16" />
          <input
            className="input"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            autoComplete="none"
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
            autoComplete="none"
            required
            minLength="6"
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
            autoComplete="none"
            required
            onChange={handleInput}
          />
        </div>

        <button
          className="btn btn-signUp"
          type="submit"
         
        >
          SignUp
        </button>
      </form>
      <div className="signUpImage">
        <img src={bgImage} alt="Register" />
      </div>
    </div>
  );
};

export default SignUp;
