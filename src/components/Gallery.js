import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SearchForm from './SearchForm.js';
import Image from './Image.js';

//const Gallery = ({list, match}) => {
class Gallery extends Component {
	constructor() {
		super();
		this.state = {
			customLoaded: false
		}
	}
	/*
	 * Creates an array of JSX Image components or a "search not found" message wrapped in a try/catch which
	 * guards against searches for absent data in the gallery. ex. "/gallery/nfj#93jfn"
	 * @return  {Array}  images - array of JSX Image components || "search not found" message
	*/
	//const populatePage = (topic) => {
	populatePage = (topic) => {
		const data = this.props.list;
		let images;

		try {
			images = data[topic].map( (item, index) => <Image src={item.url} key={index} title={item.title}/> );
		}catch {
   	  images = (<li className="not-found">
            		 <h3>No Results Found</h3>
            		 <p>You search did not return any results. Please try again.</p>
            		 <p>Make sure to use the search function.</p>
        			 </li>);
		}
		this.hasCustomLoaded(true);
		return images;
	}

	hasCustomLoaded = (answer) => {
		this.state.customLoaded = answer;
	}

	render() {
		const topic = this.props.routeProp.match.params.topic;
		return (
			<div className="photo-container">
				<br />
		    <h2>Results for {topic}</h2>
		    <br />
		    <ul>
			    <Switch>
			    	<Route exact path="/gallery" render={() => <Redirect to="/gallery/cats"/>}/>
			    	<Route exact path="/gallery/customSearch" render={({match}) => this.populatePage('customSearch') }/>
			    	<Route path="/gallery/:topic" render={(routeProp) => this.populatePage(routeProp.match.params.topic) }/>
			    </Switch>
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


      	  			    	<Route exact path="/gallery" render={() => <Redirect to="/gallery/cats"/>}/>
			    	<Route exact path="/gallery/customSearch" render={({match}) => this.populatePage('customSearch') }/>
			    	<Route path="/gallery/:topic" render={(routeProp) => this.populatePage(routeProp.match.params.topic) }/>
 */}
