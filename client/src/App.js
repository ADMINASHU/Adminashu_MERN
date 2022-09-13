import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Profile from "./components/profile/Profile";
import Login from "./components/register/Login";
import Page404 from "./components/page404/Page404";
import SignUp from "./components/register/SingUp";
import "./App.scss";

function App() {
  const [login, setLogin] = useState("false");
  const [logUser, setLogUser] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar login={login} logUser={logUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {login === "true" ? (
            <Route
              path="/profile"
              element={<Profile login={login} setLogin={setLogin} logUser={logUser} />}
            />
          ) : (
            <>
              <Route
                path="/logIn"
                element={<Login login={login} setLogin={setLogin} setLogUser={setLogUser} />}
              />
              <Route path="/signUp" element={<SignUp />} />
            </>
          )}
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
