import React, { Component } from 'react';
import './App.css';
import Map from './component/Map';
import SquareAPI from './API';
import SideBar from './component/SideBar';

const withErrorHandling = WrappedComponent => (
  
  { error, children }) => {
  return (
      <WrappedComponent>
      {error && 
      <div className="error-message">
        API Did Not Load Properly.<br></br><br></br>Try Again!
      </div>}
      {children}
    </WrappedComponent>
  );
};

const DivWithErrorHandling = withErrorHandling(({children}) => 
<div>{children}</div>)


class App extends Component {
  constructor(){
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      error: false,
      message: "",
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  toggleError = () => {
    this.setState((prevState, props) => {
      return { error: !prevState.error}
    })
  };

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers) });
  };

  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)})
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({venues: Object.assign(this.state.venues, newVenue)});
    });
  };

  handleListItemClick = (venue) => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  };

  componentDidMount(){

    SquareAPI.search({
      near:"Houston, TX",
      query: "tacos",
      limit: 5
    }).then(results => {
      
      if(typeof results.response.geocode === "undefined"){
        var venues  = [];
        const place  = {id: "5674c936498eafd4110efa65", name: "La Calle Tacos", location: {address: "909 Franklin St", cc: "US", city: "Houston", country: "United States", crossStreet: "Between Travis And Main"}, categories: [{icon: {prefix: "https://ss3.4sqi.net/img/categories_v2/food/taco_", suffix: ".png"}, id: "4bf58dd8d48988d151941735", name: "Taco Place", pluralName: "Taco Places", primary: true, shortName: "Tacos"}]};
        var center  = {lat: parseFloat(29.76328), lng: parseFloat(-95.36327)};
        venues.push(place);
        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true,
              id:venue.id
          };
        });
        this.setState({ venues, center, markers });

     }else{

      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
            id:venue.id
        };
      });
      this.setState({ venues, center, markers });
   }
   if (results.meta.errorDetail){
    this.toggleError();
    this.setState({ message : results.meta.errorDetail});
   }
  });
  }

  render() {
    return (
      <div className="App">
      <SideBar 
        {...this.state} handleListItemClick={this.handleListItemClick}
        />
        <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />    
        <DivWithErrorHandling error={this.state.error} message={this.state.message}></DivWithErrorHandling>
      
      </div>
    );
  }
}


export default App;
