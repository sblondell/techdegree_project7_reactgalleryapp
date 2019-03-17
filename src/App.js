import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import {APIKey} from './.config.js';
import Header from './components/Header.js';
import Gallery from './components/Gallery.js';

class App extends Component {
	constructor() {
		super();
		this.state = {
			gallery: { customSearch: [] },
			apiKey: APIKey,
			customLoaded: false,
			preLoading: true,
		};
	}

	searchManager = (fillStaticGallery, ...searchTerms) => {
		if (!searchTerms) { 
			this.setState({customLoaded: false});
		}else {
			searchTerms.forEach( topic => {
				let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search\
									&api_key=${this.state.apiKey}&tags=${topic}&per_page=24&format=json&nojsoncallback=1`;

				fetch(url)
					.then(response => response.json())
					.then(({photos}) => {
						// Creating an array of objects (image information)
						const imgInfo = photos.photo.map( item => ({url: `https://farm${item.farm}.staticflickr.com/\
																															${item.server}/${item.id}_${item.secret}_n.jpg`,
								            																	title: item.title}));
	        	const tempObj = {}; //Temporary working object to help replace the state.gallery object
	        	let customLoaded;

	        	if (fillStaticGallery) {
	        		tempObj[topic] = imgInfo;
	        		customLoaded = false;
	        	}else {
	        		const temp2 = {};
	        		temp2[topic] = imgInfo;
	        		tempObj['customSearch'] = temp2;
	        		customLoaded = true;
	        	}
						this.setState(prevState => ({	gallery: {...prevState.gallery, ...tempObj},
																					customLoaded: customLoaded,
																					preLoading: false
																				}));
				  })
					.catch(error => console.error("There was a problem: " + error));
				});
		}
	}

	componentDidMount() {
  	Promise.all([this.searchManager(true, 'birds', 'cats', 'dogs')])
			.catch(err => `There was a problem with initial loading of images ${err}`);
	}

	handleSubmit = searchTerm => {
		this.searchManager(false, searchTerm);	
	}

	userSearchRendered = () => {
		this.searchManager(false, null);
		console.log("search used");
	}

  render() {
    return (
    	<BrowserRouter>
	    	<div>
		    	<Header getSearch={this.handleSubmit}/>
		    	{ this.state.customLoaded ? <Redirect to="/gallery/customSearch"/> : null }
		    	{ this.state.preLoading ? <p>Loading...</p> :
		    		<Switch>
		    		  <Route exact path="/" render={() => <Redirect to="/gallery"/>}/>
	    			 	<Route exact path="/gallery" render={ routeProp => <Gallery routeProp={routeProp}/> }/>
	    			  <Route path="/gallery/:topic" render={ routeProp => <Gallery routeProp={routeProp}
	    			  																														 userSearchRendered={this.userSearchRendered}
			    			  																												 list={this.state.gallery}/> }/>
		    			  	                                                
		    			<Route render={ () => <p> DIDN"T LOAD </p> }/>
		    	 	</Switch>
		    	}
	    	</div>
	    </BrowserRouter>
    );
  }
}

export default App;
