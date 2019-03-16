import React, { Component } from 'react';
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom';

import {APIKey} from './.config.js';
import Header from './components/Header.js';
import Gallery from './components/Gallery.js';

class App extends Component {
	constructor() {
		super();
		this.state = {
			gallery: {},
			apiKey: APIKey,
			loading: true,
		};
	}

	getSearch = searchTerm => {
		let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search\
							&api_key=${this.state.apiKey}&tags=${searchTerm}&per_page=24&format=json&nojsoncallback=1`;

		let promise = fetch(url)
			.then(response => response.json())
			.then(data => {
				// Creating an array of objects (image information)
				const imgInfo = 
					data.photos.photo
					.map( item => {
						return ({ url: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_n.jpg`,
						          title: item.title })
					})
				// Creating a new 'object' with the key being the user's search criteria
				const newObj = {};
				newObj[searchTerm] = imgInfo; 

        // Set the gallery state to the previous gallery entries, plus the new entry;
        // all organized by user's search string.
				this.setState(prevState => ({	gallery: {...prevState.gallery, ...newObj},
																			customSearch: searchTerm,
																			loading: false }));
		  })
			.catch(error => console.error("There was a problem: " + error));
			return promise;
	}

	componentDidMount() {
		Promise.all([
			this.getSearch('cats'),
			this.getSearch('dogs'),
			this.getSearch('birds')])
		.catch(err => `There was a problem with initial loading of images ${err}`);
	}

  render() {
    return (
    	<HashRouter>
	    	<div>
		    	<Header />

		    	{ this.state.loading ?
		    			<p>Loading...</p> :
			    		<Switch>
		    			  <Route exact path="/"
		    							 render={() => <Redirect to="/gallery/:topic"/>}/>,
		    			  <Route path="/gallery/:topic"
		    					     render={props => <Gallery
		    					     										list={this.state.gallery}
		    					     										getSearch={this.getSearch}
		    					     										routeProp={props} />} />
			    		</Switch>
		    	}
	    	</div>
	    </HashRouter>
    );
  }
}

export default App;
