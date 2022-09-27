import React from "react";
import useAuth from "../../hooks/useAuth";
import "./profile.scss";

const Profile = () => {
  const { auth, setAuth } = useAuth();



  return (
    <div className="page">
      <h1>Profile page </h1>
      <br />
      <br />
      <h1>{auth.username}</h1>
      <br />
      <br />
      <button className="btn" type="submit" onClick={() => setAuth({})}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
