import React from 'react';
import { NavLink } from 'react-router-dom';

//Styling
import './navbar.scss';

const Navbar = props => {
  return (
    <nav className="navbar">
      <div className="title">
        <NavLink to="/"><h1>Fatigue Tracker</h1></NavLink>
      </div>

      <div className="links">
        <ul>
          <li><NavLink to="/analysis">Analysis</NavLink></li>
          <li><NavLink to="/logs">Logs</NavLink></li>
          <li><NavLink to="/today">Today</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;