import React from 'react';
import { Outlet, NavLink } from "react-router-dom";

const Navbar = () => {
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
          <li>
            <NavLink to="/login" style={({ isActive }) => ({
              color: isActive ? 'blue' : 'black'
            })}>Login / Sign Up</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Navbar;