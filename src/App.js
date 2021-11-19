import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 16,
    errorText: "",
  }



  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? events : events.filter((event) => event.location === location);
      const shownEvents = locationEvents.slice(0, eventCount);
      this.setState({
        events: shownEvents,
        currentLocation: location
      });
    });
  }

  updateEventCount = async (e) => {
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
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const { numberOfEvents } = this.state;
    return (
      <div className="App">
        <div className="App-logo" >
          <img src={logo} alt="meet app logo"/>
        </div>
        <CitySearch 
          locations={this.state.locations} 
          updateEvents={this.updateEvents}/>
        <NumberOfEvents 
          numberOfEvents={numberOfEvents} 
          updateEventCount={this.updateEventCount} 
          errorText={this.state.errorText}/>
        <EventList events={this.state.events} />
      </div>
    );
  }
}


export default App;
