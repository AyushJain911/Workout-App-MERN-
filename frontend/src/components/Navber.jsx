import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/UseLogout.js";
import { useAuthContext } from "../hooks/UseAuthContext.js";

const Navbar = () => {
  const { logOut } = useLogout();
  const { user } = useAuthContext();

  const logOutHandler = () => {
    logOut();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={logOutHandler}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
