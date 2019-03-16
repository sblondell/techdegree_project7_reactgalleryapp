import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import SearchForm from './SearchForm.js';
import Image from './Image.js';

//const Gallery = ({list, routeProp, customSearch, getSearch}) => {
class Gallery extends Component {
	constructor() {
		super();
		this.customSearch = 'FIND';
		console.log("INITIALISED " + this.customSearch);
	};

	/*
	 * Creates an array of JSX Image components or a "search not found" message wrapped in a try/catch which
	 * guards against searches for absent data in the gallery. ex. "/gallery/nfj#93jfn"
	 * @return  {Array}  images - array of JSX Image components || "search not found" message
	*/
	populatePage = userSearch => {
		const topic = this.customSearch ? this.customSearch : userSearch;
		const data = this.props.list[topic];
		let images;

		try {
			images = data.map( (item, index) => <Image src={item.url} key={index} title={item.title}/> );
		}catch {
   	  images = (<li className="not-found">
            		 <h3>No Results Found</h3>
            		 <p>You search did not return any results. Please try again.</p>
        			 </li>);
		}
		this.purgeRecentSearch();
		return images;
	}

	purgeRecentSearch = () => {
		this.customSearch = '';
		console.log("EMPTIED " + this.customSearch);
	}

  handleSearch = (userSearch) => {
  	this.props.getSearch(userSearch);
  	this.customSearch = userSearch;
		console.log("HANDLE " + this.customSearch);
  }

  render() {
		const path = this.props.routeProp.match.path;
		const topic = this.customSearch ? this.customSearch : this.props.routeProp.match.params.topic; 
		
		return (
			<div className="photo-container">
				<SearchForm search={this.handleSearch} />
				<br />
		    <h2>Results for {topic}</h2>
		    <br />
		    <ul>
		    	<Route
		    		path={`${path}`}
		    		render={() => this.populatePage(topic)} />
				</ul>
			</div>
		);
	}
}

export default Gallery;
		      	{/* Instead of creating THREE distinct routes for the default image topics,
		      		* I just created ONE route with dynamic properties. The end result is the
		      		* same--the user sees the URL reflect their choice, but this method 
		      	  * makes the app more modular.                                            
						<Route 
							path={`/gallery/${search}`}
							render={ () => this.populatePage() } /> */}
	    	{/*<Route
	    		path={`${routeProp.match.path}/dogs`}
	    		render={ () => <GalleryContainer list={list}/> } />*/}
