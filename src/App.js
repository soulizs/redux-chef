import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { setCordX, setCordY, addPoints, clearPoints } from './actions';
import { Cord } from './models';

function generateRandNum() {
  return (Math.random() * 100).toFixed(0);
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <code>{JSON.stringify(this.props.cord)}</code>

          <code>{JSON.stringify(this.props.points)}</code>

          <div className="button-list">
            <span className="btn-dispatch" onClick={() => setCordX(generateRandNum())}>
              setCordX
            </span>

            <span className="btn-dispatch" onClick={() => setCordY(generateRandNum())}>
              setCordY
            </span>

            <span
              className="btn-dispatch"
              onClick={() => {
                Cord.update(generateRandNum(), generateRandNum());
              }}
            >
              Cord Update
            </span>

            <span
              className="btn-dispatch"
              onClick={() => {
                Cord.setDoubleX();
              }}
            >
              Cord setDoubleX
            </span>

            <span
              className="btn-dispatch"
              onClick={() =>
                addPoints({
                  x: generateRandNum(),
                  y: generateRandNum()
                })
              }
            >
              addPoints
            </span>

            <span className="btn-dispatch" onClick={clearPoints}>
              clearPoints
            </span>
          </div>
        </header>
      </div>
    );
  }
}

export default connect(state => state)(App);
