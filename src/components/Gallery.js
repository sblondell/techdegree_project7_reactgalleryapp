import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SearchForm from './SearchForm.js';
import Image from './Image.js';

//const Gallery = ({list, match}) => {
class Gallery extends Component {
	/*
	 * Creates an array of JSX Image components or a "search not found" message wrapped in a try/catch which
	 * guards against searches for absent data in the gallery. ex. "/gallery/nfj#93jfn"
	 * @return  {Array}  images - array of JSX Image components || "search not found" message
	*/
	//const populatePage = (topic) => {
	populatePage = (topic = 'cats') => {
		const data = this.props.list;
		let images = null;

		try {
			images = data[topic].map( (item, index) => <Image src={item.url} key={index} title={item.title}/> );
		}catch {
   	  images = (<li className="not-found">
            		 <h3>No Results Found</h3>
            		 <p>You search did not return any results. Please try again.</p>
            		 <p>Make sure to use the search function.</p>
        			 </li>);
		}
		return images;
	}

	render() {
		console.log(this);
		const topic = this.props.match.params.topic || 'cats';
		const title = (this.props.match.params.topic ? 
										`Results For ${this.props.match.params.topic}` : 
										`Welcome, have some ${topic}...`);
		console.log("TOPIC " + title);

		return (
			<div className="photo-container">
				<br />
		    <h2>{title}</h2>
		    <br />
		    <ul>
		    	{this.populatePage(topic)}
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

		    	<Route path="/gallery/:topic" render={(routeProp) => <p>routeProp</p> }/>
			    	<Route path="/gallery/:topic" render={(routeProp) => this.populatePage(routeProp.match.params.topic) }/>

 */}
