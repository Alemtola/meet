import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import Container from 'react-bootstrap/Container'


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

  
  /*updateEventCount = async (e) => {
    const newNumber = e.target.value ? parseInt(e.target.value) : 16;

    if (newNumber < 1 || newNumber > 16) {
      await this.setState({
        errorText: "Select number between 1 and 16",
      });
    } else {
      await this.setState({
        errorText: "",
        numberOfEvents: newNumber,
      });
      this.updateEvents(this.state.currentLocation, this.state.numberOfEvents);
    }
  }*/

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
