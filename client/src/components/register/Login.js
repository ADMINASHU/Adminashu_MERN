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
    navigate("/profile");
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const { email, password } = user;
  const priColor = "#040480";

  const submitSignIN = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all field");
    } else {
      try {
        const sendData = await fetch("http://localhost:4000/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const result = await sendData.json();
        console.log(result);
        if (!result) {
          alert("Server down");
          setLogUser({});
        } else if (sendData.status === 400) {
          alert("invalid credentials");
          setLogUser({});
        } else if (sendData.status === 200) {
          setLogUser(result);
          setUser({});
          console.log("User SignIn");
          setLogin("true");
          navigate("/profile");
        }
        // else{
        //   console.log(result);
        //   console.log("User SignIn");
        //   setLogin("true");
        //   navigate("/profile");
        // }
      } catch (error) {
        console.log(error);
        setLogin("false");
      }
    }
  };

  return (
    <div className="logInPage">
      <div className="logInImage">
        <img src={bgImage} alt="LogIn" />
      </div>
      <form method="post" onSubmit={submitSignIN} className="logInForm">
        <h1>LogIn</h1>
        <div className="inputBox">
          <UserImg fill={priColor} height="16" />
          <input
            className="input"
            type="email"
            placeholder="User Id"
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
            onChange={handleInput}
          />
        </div>
        <button className="btn btn-logIn" type="submit">
          LogIn
        </button>
      </form>
    </div>
  );
};

export default Login;
