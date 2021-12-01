import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to='/'>
        <h1>RPG</h1>
      </Link>
      <ul>
        <Link to='/character'>
          <li>Character</li>
        </Link>
        <Link to='/adventure'>
          <li>Adventure</li>
        </Link>
        <Link to='/about'>
          <li>About</li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
