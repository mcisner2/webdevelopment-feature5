// Navigation.jsx
// Enables site navigation between different pages.

import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav aria-label="Main" style={{ display: "flex", gap: "16px" }}>
      <NavLink to="/">Signs</NavLink>
      <NavLink to="/history">History</NavLink>

      {/* /home is the gateway to the protected page */}
      <NavLink to="/home">My Account</NavLink>

      {/* menu page with the register and login buttons */}
      <NavLink to="/auth">Login / Register</NavLink>
    </nav>
  );
}