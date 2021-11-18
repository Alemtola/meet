import React, {Component} from 'react';

class NumberOfEvents extends Component {

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