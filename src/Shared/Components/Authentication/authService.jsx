// authService.jsx

import Parse from "parse";

// used in auth register component
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);
  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// used in auth login component
export const loginUser = (currUser) => {
  console.log("currUser: ", currUser);
  return Parse.User.logIn(currUser.email, currUser.password)
    .then((currUserSaved) => {
      return currUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// export check user functions for use in other components

export const checkUser = () => {
  return Parse.User.current()?.authenticated;
};

export const logoutUser = () => {
  return Parse.User.logOut();
};

export const getCurrentUser = () => {
  return Parse.User.current();
};