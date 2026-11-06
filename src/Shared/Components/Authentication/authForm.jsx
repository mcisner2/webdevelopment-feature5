// authForm.jsx

import React from "react";

// define AuthForm component
const AuthForm = ({ user, isLogin, onChildChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} autoComplete="off">
      {/* conditionally render first and last name if not login */}
      {!isLogin ? (
        <div>
          <div className="form-group">
            <label>First Name</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="first-name-input"
              value={user.firstName}
              onChange={onChildChange}
              name="firstName"
              placeholder="first name"
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="last-name-input"
              value={user.lastName}
              onChange={onChildChange}
              name="lastName"
              required
            />
          </div>{" "}
        </div>
      ) : (
        <></>
      )}
      {/* email and password pop up even if not logging in */}
      <div>
        <div className="form-group">
          <label>Email</label>
          <br />
          <input
            type="email"
            className="form-control"
            id="email-input"
            value={user.email}
            onChange={onChildChange}
            name="email"
            required
          />
        </div>{" "}
        <div className="form-group">
          <label>Password</label>
          <br />
          <input
            type="password"
            className="form-control"
            id="password-input"
            value={user.password}
            onChange={onChildChange}
            name="password"
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" onSubmit={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;