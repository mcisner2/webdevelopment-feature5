// auth.jsx


// import React and hooks from React

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./authService";

// go off of class lecture example and define AuthModule
const AuthModule = () => {
  const navigate = useNavigate();

  // redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);


  // return login and register buttons
  return (
    <div>
      <Link to="/auth/register">
        <button>Register</button>
      </Link>
      <br />
      <br />
      <Link to="/auth/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default AuthModule;