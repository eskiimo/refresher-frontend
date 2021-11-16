import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const navLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All users
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places">My Places</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">Add Place</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Auth</NavLink>
      </li>
      {/* <li>
                <NavLink to="/">All users</NavLink>
            </li> */}
    </ul>
  );
};

export default navLinks;
