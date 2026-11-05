// Navigation.jsx
// Enables site navigation and shows the login/register link when no user is logged in.

import { NavLink, useLocation } from "react-router-dom";
import { checkUser } from "@/Shared/Components/Authentication/authService";

export default function Navigation() {
  // Component re-renders when the location changes (import for My Account link)
  useLocation();

  // true when a Parse user is logged in
  const loggedIn = !!checkUser();

  // Logged in users see the My Account link
  // Logged-out users see the auth menu instead.
  
  return (
    <nav aria-label="Main" style={{ display: "flex", gap: "16px" }}>
      <NavLink to="/">Signs</NavLink>
      <NavLink to="/history">History</NavLink>

      {loggedIn ? (
        <NavLink to="/home">My Account</NavLink>
      ) : (
        <NavLink to="/auth">Login / Register</NavLink>
      )}
    </nav>
  );
}