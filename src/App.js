import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { setCordX, setCordY, addPoints, clearPoints } from './actions';
import { Cord } from './models';

function randNum() {
  return (Math.random() * 100).toFixed(0);
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <code>{JSON.stringify(this.props.cord, null, 2)}</code>

          <code>{JSON.stringify(this.props.points, null, 2)}</code>

          <div className="button-list">
            <span className="btn-dispatch" onClick={() => setCordX(randNum())}>
              setCordX
            </span>

            <span className="btn-dispatch" onClick={() => setCordY(randNum())}>
              setCordY
            </span>

            <span
              className="btn-dispatch"
              onClick={() => {
                Cord.update(randNum(), randNum());
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
                  x: randNum(),
                  y: randNum()
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
