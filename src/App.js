import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import Container from 'react-bootstrap/Container'
import { InfoAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';


class App extends Component {


  state = {

    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 16,
    showWelcomeScreen: undefined
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
  

  /*
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  };
  */

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
       if (this.mounted) {
         this.setState({ events, locations: extractLocations(events) });
        }
      });
     }
  }
    

  componentWillUnmount(){
    this.mounted = false;
  }

  render(){
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    
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

          <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken();
            }}
          />

        </div>
      </Container>
    );
  }
 
}


export default App;
