import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className="main-nav">
			<ul>
			<li><NavLink to="/gallery/cats">Cats</NavLink></li>
			<li><NavLink to="/gallery/dogs">Dogs</NavLink></li>
			<li><NavLink to="/gallery/birds">Birds</NavLink></li>
			</ul>
		</nav>
	);
}


export default NavBar;



/*
<nav class="main-nav">
        <ul>
          <li><a href='#'>Cats</a></li>
          <li><a href='#'>Dogs</a></li>
          <li><a href='#'>Computers</a></li>
        </ul>
      </nav>
      */