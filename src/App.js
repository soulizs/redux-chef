import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { setCordX, setCordY, addPoints, clearPoints } from './actions';
import { Cord } from './models';

function randNum() {
  return (Math.random() * 100).toFixed(0)
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          {JSON.stringify(this.props.cord, null, 4)}

          {JSON.stringify(this.props.points, null, 4)}

          <span className="App-link" onClick={() => setCordX(randNum())}>
            setCordX
          </span>

          <span className="App-link" onClick={() => setCordY(randNum())}>
            setCordY
          </span>

          <span
            className="App-link"
            onClick={() => {
              Cord.update(randNum(), randNum());
            }}
          >
            Cord Update
          </span>


          <span
            className="App-link"
            onClick={() => {
              Cord.setDoubleX();
            }}
          >
            Cord setDoubleX
          </span>

          <span
            className="App-link"
            onClick={() =>
              addPoints({
                x: randNum(),
                y: randNum()
              })
            }
          >
            addPoints
          </span>

          <span className="App-link" onClick={clearPoints}>
            clearPoints
          </span>
        </header>
      </div>
    );
  }
}

export default connect(
  state => state,
  null
)(App);
