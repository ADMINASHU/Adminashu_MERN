import React from "react";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Profile from "./components/profile/Profile";
import User from "./components/user/User";
import Login from "./components/register/Login";
import Page404 from "./components/page404/Page404";
import SignUp from "./components/register/SingUp";
import "./App.scss";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route element={<ProtectedAuthRoute />}>
            <Route path="/user" element={<User />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/logIn" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
