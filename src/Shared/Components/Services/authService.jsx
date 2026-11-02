import Parse from "./parseConfig";

export const createUser = (newUser) => {
  const user = new Parse.User();
  user.set("username", newUser.email);
  user.set("password", newUser.password);
  user.set("email", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);

  console.log("user: ", user);

  return user
    .signUp()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const loginUser = (currUser) => {
  return Parse.user
    .logIn(currUser.email, currUser.password)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      alert(`$(error.message)`);
    });
};

export const checkUser = () => Parse.User.current() || null;
export const logoutUser = () => Parse.User.logOut();