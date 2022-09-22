import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.scss";
import AuthContext from "../../context/AuthProvider";

const Profile = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (auth) {
      navigate("/logIn"); // after not success login navigate to login page back
    }
  }, []);

  return (
    <div className="page">
      <h1>Profile page </h1>
      <br />
      <br />
      <h1>{}</h1>
      <br />
      <br />
      <button className="btn" type="submit" onClick={() => setAuth({})}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
