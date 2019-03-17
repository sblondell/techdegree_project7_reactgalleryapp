import React, { Component } from 'react';
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom';

import {APIKey} from './.config.js';
import Header from './components/Header.js';
import Gallery from './components/Gallery.js';

class App extends Component {
	constructor() {
		super();
		this.state = {
			gallery: { customSearch: [] },
			apiKey: APIKey,
			loading: true,
		};
	}

	getSearch = (fillStaticGallery = false, ...searchTerms) => {
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

        	if (fillStaticGallery) {
        		tempObj[topic] = imgInfo;
        	}else {
        		const temp2 = {};
        		temp2[topic] = imgInfo;
        		tempObj['customSearch'] = temp2;
        	}
					this.setState(prevState => ({	gallery: {...prevState.gallery, ...tempObj},
																				loading: false
																			}));
					console.log(tempObj);
			  })
				.catch(error => console.error("There was a problem: " + error));
			});
	}

	componentDidMount() {
  	Promise.all([this.getSearch(true, 'birds', 'cats', 'dogs')])
			.catch(err => `There was a problem with initial loading of images ${err}`);
	}

	handleSubmit = (searchTerm) => {
		this.getSearch(false, searchTerm);	
	}

  render() {
    return (
    	<HashRouter>
	    	<div>
		    	<Header getSearch={this.handleSubmit}/>
		    	{ this.state.loading ? <p>Loading...</p> :
		    		<Switch>
		    		  <Route exact path="/" render={() => <Redirect to="/gallery"/>}/>
	    			 	<Route exact path="/gallery" render={ (routeProp) => <Gallery routeProp={routeProp}
	    			  																												list={this.state.gallery}/> }/>
	    			  <Route path="/gallery/:topic" render={ (routeProp) => <Gallery routeProp={routeProp}
	    			  																												list={this.state.gallery}/> }/>
		    			  	                                                
		    			<Route render={ () => <p> DIDN"T LOAD </p> }/>
		    	 	</Switch>
		    	}
	    	</div>
	    </HashRouter>
    );
  }
}

export default App;
