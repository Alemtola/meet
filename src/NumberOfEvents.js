import React, {Component} from 'react';

class NumberOfEvents extends Component {

 /* state = {
    numberOfEvents: 32
  }

  handleInputChanged = (event) => {
    const number = event.target.value;
    if (number <= 0 || number > 32) {
      return window.alert('Select between 1-32');
    } else {
      this.setState({ 
        numberOfEvents: number,
      });
    }
  }; */

  render() {
    return (
      <div className="NumberOfEvents">

        <p>Number of Events:</p>
        <input
        type="text"
        name="number"
        className="number-of-events"
        value={this.props.numberOfEvents}
        onChange={(e) => this.props.updateEventCount (e)}
        />
      </div>
    );
  }
}

export default NumberOfEvents;