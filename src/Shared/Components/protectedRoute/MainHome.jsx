// MainHome.jsx

import { useState, useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { checkUser } from "../Authentication/authService";

const MainHome = () => {
  // flag starts false and is updated once the session check runs
  const [flag, setFlag] = useState(false);

  // Asks the auth service whether a user is logged in and stores the answer as true or false
  useEffect(() => {
    if (checkUser()) {
      console.log("authorized");
      setFlag(true);
    } else {
      console.log("unauthorized");
      setFlag(false);
    }
  }, []);

  // ProtectedRoute forwards to /user when flag is true
  // When the flag is false, it shows "Unauthorized!"
  return <ProtectedRoute path="/user" flag={flag} />;
};

export default MainHome;