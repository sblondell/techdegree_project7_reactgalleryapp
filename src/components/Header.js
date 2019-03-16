import React from 'react';
import NavBar from './NavBar.js';

const Header = ({ getSearch }) => {
	const title = "Dummy text";
	return (
		<div>
			<p>{title}</p>
			<NavBar />
		</div>
	);
}


export default Header;