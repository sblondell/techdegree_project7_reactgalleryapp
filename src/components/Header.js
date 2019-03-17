import React from 'react';

import SearchForm from './SearchForm.js';
import NavBar from './NavBar.js';

const Header = ({ getSearch, changeLoadingState }) => {
	const title = "Dummy text";
	return (
		<div>
			<p>{title}</p>
			<br />
			<SearchForm getSearch={getSearch} changeLoadingState={changeLoadingState}/>
			<br />
			<NavBar />
		</div>
	);
}


export default Header;