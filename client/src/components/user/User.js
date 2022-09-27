import React from "react";
import useAuth from "../../hooks/useAuth";
import "./user.scss";

const User = () => {
  const { auth, setAuth } = useAuth();



  return (
    <div className="page">
      <h1>User page </h1>
  
     
    </div>
  );
};

export default User;
