// ProtectedRoute.jsx 

import { Navigate, useNavigate } from "react-router-dom";
const ProtectedRoute = ({ flag, ...rest }) => {
  const navigate = useNavigate();

  // Sends a blocked visitor back to the landing page
  const buttonHandler = () => {
    navigate("/");
  };

  return (
    <div>
      {flag ? (
        // Logged in: redirect to the protected path.
        <Navigate to={rest.path} replace />
      ) : (
        // Not logged in: show a message instead of the protected page
        <div>
          <p>Unauthorized!</p>
          <button onClick={buttonHandler}>Go Back.</button>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;