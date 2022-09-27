import React, { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { ReactComponent as BarImg } from "../../assets/images/bar.svg";
import { ReactComponent as LogoImg } from "../../assets/images/logo.svg";
import { ReactComponent as CloseImg } from "../../assets/images/close.svg";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navRef = useRef();
  const [click, setClick] = useState("bar");
  const priColor = "#040480";
  const changeMenu = () => {
    if (click === "close") {
      setClick("bar");
      navRef.current.classList.add("hide");
    } else {
      setClick("close");
      navRef.current.classList.remove("hide");
    }
  };
  return (
    <div className="navbar">
      <NavLink className="logo" to={"/"}>
        <LogoImg fill={priColor} height="35" />{" "}
        <span className="first">Admin</span>
        <span className="last">ashu</span>
      </NavLink>
      <div className="navLinks hide" ref={navRef}>
        <ul className="links">
          <li>
            <NavLink className="link" to={"/"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to={"/about"}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to={"/contact"}>
              Contact
            </NavLink>
          </li>
          {auth.username ? (
            <li>
              <NavLink className="link" to={"/user"}>
                User
              </NavLink>
            </li>
          ) : (
            <></>
          )}
        </ul>
        {auth.username ? (
          <div className="account">
            <NavLink className="profile" to={"/profile"}>
              <p className="letter">{auth.username.charAt(0)}</p>
            </NavLink>
            <p className="userName">{auth.username}</p>
          </div>
        ) : (
          <div className="register">
            <NavLink className="logIn" to={"/login"}>
              SignIn
            </NavLink>
            <NavLink className="signUp" to={"/signup"}>
              SignUp
            </NavLink>
          </div>
        )}
      </div>
      <div className="menuImg">
        {click === "bar" ? (
          <BarImg
            className="barImg"
            fill={priColor}
            height="30"
            onClick={changeMenu}
          />
        ) : (
          <CloseImg
            className="barImg"
            fill={priColor}
            height="35"
            onClick={changeMenu}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
