import { useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../Authentication/authService.jsx";
import { updateProfile, changePassword } from "./profileModel.jsx";

// Protected page for /profile: edit name, email (also the username),
// and password.
export default function ProfilePage() {
  const user = getCurrentUser();
  const [firstName, setFirstName] = useState(user?.get("firstName") ?? "");
  const [lastName, setLastName] = useState(user?.get("lastName") ?? "");
  const [email, setEmail] = useState(user?.get("email") ?? "");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Not logged in: send them to the gateway, which shows "Unauthorized!"
  if (!user) return <Navigate to="/home" replace />;

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await updateProfile({ firstName, lastName, email });
      setMessage("Profile saved.");
    } catch (err) {
      setError(err.message); // e.g. that email is already taken
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await changePassword(newPassword);
      setNewPassword("");
      setMessage("Password changed.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <h2>Profile</h2>
      <form onSubmit={handleSave}>
        <label>First name <input value={firstName} required
          onChange={(e) => setFirstName(e.target.value)} /></label>
        <label>Last name <input value={lastName} required
          onChange={(e) => setLastName(e.target.value)} /></label>
        <label>Email (also your login username)
          <input type="email" value={email} required
            onChange={(e) => setEmail(e.target.value)} /></label>
        <button type="submit">Save profile</button>
      </form>

      <form onSubmit={handlePassword}>
        <label>New password <input type="password" minLength={6} required
          value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></label>
        <button type="submit">Change password</button>
      </form>

      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
      {/* TODO: show learned signs and past quiz scores once Progress and
          QuizResult exist (story 6) */}
    </section>
  );
}