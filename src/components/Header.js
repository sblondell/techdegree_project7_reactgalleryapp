import React from 'react';

import SearchForm from './SearchForm.js';
import NavBar from './NavBar.js';

const Header = ({ getSearch }) => {
	const title = "Dummy text";
	return (
		<div>
			<p>{title}</p>
			<br />
			<SearchForm getSearch={getSearch} />
			<br />
			<NavBar />
		</div>
	);
}


export default Header;