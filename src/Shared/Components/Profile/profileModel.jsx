import Parse from "parse";

// Sends Back4App's password reset email to the address on the account.
export function sendPasswordReset(email) {
  return Parse.User.requestPasswordReset(email);
}

// Updates name and login email. Sign-up and login both use the email as
// the username, so username changes together with email, or the next
// login would fail.
export async function updateProfile({ firstName, lastName, email }) {
  const user = Parse.User.current();
  user.set("firstName", firstName);
  user.set("lastName", lastName);
  user.set("email", email);
  user.set("username", email);
  return user.save();
}

// Changes the password, then logs in again with it, because Parse can
// end the old session after a password change.
export async function changePassword(newPassword) {
  const user = Parse.User.current();
  const username = user.getUsername();
  user.setPassword(newPassword);
  await user.save();
  return Parse.User.logIn(username, newPassword);
}