import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import Container from 'react-bootstrap/Container'
import { InfoAlert } from './Alert';


class App extends Component {


  state = {

    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 16
  }

 
  
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? events : events.filter((event) => event.location === location);
      const { numberOfEvents } = this.state;
      this.setState({
        events: locationEvents.slice(0, numberOfEvents)
      });
    });
  }

  updateNumberOfEvents = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount
    });
    this.updateEvents(currentLocation, eventCount);
  }
  

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  };

  componentWillUnmount(){
    this.mounted = false;
  }

  render(){
    
    return (
      <Container>
        <div className="App">
       
          <div className="App-logo" >
            <img src={logo} alt="meet app logo"/>
            { !navigator.onLine ? (<InfoAlert text='You are offline!' />) : (<InfoAlert text=' ' />)}
          </div>

          <CitySearch 
            locations={this.state.locations} 
            updateEvents={this.updateEvents}/>

          <NumberOfEvents 
            numberOfEvents={this.state.numberOfEvents} 
            updateNumberOfEvents={this.updateNumberOfEvents} />
          
          <EventList events={this.state.events} />
    
        </div>
      </Container>
    );
  }
 
}


export default App;
