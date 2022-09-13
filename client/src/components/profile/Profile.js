import React from "react";
import { useNavigate } from "react-router-dom";
import "./profile.scss";

const Profile = ({ logUser, setLogin }) => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Profile page </h1>
      <br /><br />
      <h1>{logUser.uname}</h1>
      <br /><br />
      <button
        className="btn"
        type="submit"
        onClick={() => {
          setLogin("false");
          navigate("/login");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Profile;
