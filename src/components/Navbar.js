import React, { useState } from 'react';
import { Outlet, NavLink } from "react-router-dom";
import Logout from './Logout';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [loggedUser, setLoggedUser] = useState(null)

  const auth = getAuth();
  //const navigator = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.email);
      setLoggedUser(user.email);
    } else {
      console.log('User logged out');
      setLoggedUser(null);
    }
  });

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/" style={({ isActive }) => ({
              color: isActive ? 'blue' : 'black'
            })}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/mybirds" style={({ isActive }) => ({
              color: isActive ? 'blue' : 'black'
            })}>My Birds</NavLink>
          </li>
          {!loggedUser && (
            <li>
              <NavLink to="/login" style={({ isActive }) => ({
                color: isActive ? 'blue' : 'black'
              })}>Login / Sign Up</NavLink>
            </li>
          )}
          {loggedUser && (
            <div>
              {loggedUser}
              <li>
                <Logout />
              </li>
            </div>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Navbar;