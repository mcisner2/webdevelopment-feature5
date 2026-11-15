import { useState } from "react";
import { sendPasswordReset } from "./profileModel.jsx";

// Page for /auth/forgot: asks for an email and sends the reset link.
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await sendPasswordReset(email);
      // Same wording whether or not the email exists, so the page
      // doesn't reveal who has an account.
      setMessage("If an account exists for that email, a reset link is on its way.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <h2>Reset your password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email <input type="email" value={email} required
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Send reset email</button>
      </form>
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}