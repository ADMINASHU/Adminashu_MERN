import React, { useContext, useState, useEffect, useRef } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signUp.scss";
import bgImage from "../../assets/images/login.svg";
import {
  faUser,
  faLock,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);

  //useRef for input fields..................................
  const userNameRef = useRef();
  const errRef = useRef();

  //useState for input fields..................................
  const [userName, setUserName] = useState("");
  // const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [password, setPassword] = useState("");
  // const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect ........................................................
  useEffect(() => {
    userNameRef.current.focus();
  }, []); // useEffect for first time focus in userName field

  useEffect(() => {
    setErrMsg("");
  }, [userName, password]); // useEffect for set Error

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/profile"); // after success login navigate to profile page
    }
  }, []);

  // functions define ................................................
  const priColor = "#040480";
  // const insColor = "white";
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/register",
        JSON.stringify({
          uname: userName,
          password: password,
        }),
        {
          header: { "content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      setAuth({ userName, role, accessToken });
      setUserName("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("Server not responding");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Credentials");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("SignIn Failed");
      }
    }
  };

  return (
    <div className="logInPage">
      <div className="logInImage">
        <img src={bgImage} alt="LogIn" />
      </div>
      <form method="post" onSubmit={handleSubmit} className="logInForm">
        <h1>LogIn</h1>
        <div className="inputBox">
          <FontAwesomeIcon icon={faUser} color={priColor} size="xl" />
          <input
            className="input"
            type="text"
            placeholder="username"
            name="userName"
            value={userName}
            autoComplete="none"
            required
            ref={userNameRef}
            onChange={(e) => setUserName(e.target.value)}
            onFocus={() => setUserNameFocus(true)}
            onBlur={() => setUserNameFocus(false)}
          />
        </div>
        <div className="inputBox">
          <FontAwesomeIcon icon={faLock} color={priColor} size="xl" />
          <input
            className="input"
            type="password"
            placeholder="password"
            name="password"
            value={password}
            // autoComplete="off"
            required
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
        </div>
        <button className="btn btn-logIn" type="submit">
          SignIn
        </button>
        <br />
        <span className="invalidError" ref={errRef}>
          {errMsg}
        </span>
        <br />
        <p className="logInLink">
          Create Account?
          <br />
          <NavLink to={"/signUp"}>SignUp</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
