// Navigation.jsx
// Site-wide navigation. Each NavLink matches one <Route> in Components.jsx.

import { NavLink, useLocation } from "react-router-dom";
import { checkUser } from "@/Shared/Components/Authentication/authService.jsx";

export default function Navigation() {
  // Reading the location makes this component re-render on every page
  // change, so the links below update right after a login or logout.
  useLocation();

  // true when a Parse user is logged in
  const loggedIn = !!checkUser();

  return (
    <nav aria-label="Main" style={{ display: "flex", gap: "16px" }}>
      <NavLink to="/">Signs</NavLink>
      <NavLink to="/history">History</NavLink>

      {/* Logged-in users see their account and profile links. Logged-out
          users see the auth menu instead. */}
      {loggedIn ? (
        <>
          <NavLink to="/home">My Account</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </>
      ) : (
        <NavLink to="/auth">Login / Register</NavLink>
      )}
    </nav>
  );
}