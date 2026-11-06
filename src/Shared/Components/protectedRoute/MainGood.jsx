// MainGood.jsx

import { Link, Navigate, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../Authentication/authService";

const MainGood = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  // If they typed /user without logging in, send them to the gateway
  if (!user) return <Navigate to="/home" replace />;

  // handle logout and navigate back to main page
  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  // return main page
  return (
    <div>
      <h1>
        User: {user.get("firstName") || user.get("username")}{" "}
        {user.get("lastName")}
      </h1>
      <button onClick={handleLogout}>Logout</button>
      <button>
        <Link to="/">Go back.</Link>
      </button>
    </div>
  );
};

export default MainGood;