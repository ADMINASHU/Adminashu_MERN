import React, { useState } from "react";
import { ReactComponent as UserImg } from "../../assets/images/user.svg";
import { ReactComponent as PassImg } from "../../assets/images/pass.svg";
import bgImage from "../../assets/images/login.svg";
import "./signUp.scss";
import { useNavigate } from "react-router-dom";

const Login = ({ login, setLogin, setLogUser }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  if (login === "true") {
    navigate("/profile")
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const { email, password } = user;
  const priColor = "#040480";

  const submitSignIN = async () => {
    try {
      const sendData = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await sendData.json();
      setLogUser(result)
      if (result) {
        setUser({});
        console.log("User SignIn");
        setLogin("true");
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      setLogin("false");
    }
  };

  return (
    <div className="logInPage">
      <div className="logInImage">
        <img src={bgImage} alt="LogIn" />
      </div>
      <div className="logInForm">
        <h1>LogIn</h1>
        <div className="inputBox">
          <UserImg fill={priColor} height="16" />
          <input
            className="input"
            type="text"
            placeholder="User Id"
            name="email"
            value={email}
            autoComplete="false"
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
            onChange={handleInput}
          />
        </div>
        <button
          className="btn btn-logIn"
          type="submit"
          onClick={() => submitSignIN()}
        >
          LogIn
        </button>
      </div>
    </div>
  );
};

export default Login;
