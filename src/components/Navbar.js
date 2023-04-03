import React from 'react';
import { Outlet, NavLink } from "react-router-dom";
import Logout from './Logout';

const Navbar = ( {loggedUser } ) => {
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