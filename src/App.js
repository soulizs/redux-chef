import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { setCordX, setCordY, addPoints, clearPoints } from './actions/index.ts';
import models from './models/index.ts';

function generateRandNum() {
  return (Math.random() * 100).toFixed(0);
}

function Button(props) {
  const { children, onClick } = props;
  return (
    <span className="btn-dispatch" onClick={onClick}>
      {children}
    </span>
  )
}

function updateCord() {
  models.Cord.update(generateRandNum(), generateRandNum())
}

function setDoubleCordX() {
  models.Cord.setDoubleX();
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
            <Button onClick={() => setCordX(generateRandNum())}>set cord x</Button>
            <Button onClick={() => setCordY(generateRandNum())}>set cord y</Button>
            <Button onClick={updateCord}>update cord x & y</Button>
            <Button onClick={setDoubleCordX}>double cord x</Button>
            <Button onClick={() =>
              addPoints({
                x: generateRandNum(),
                y: generateRandNum()
              })
            }>add points</Button>
            <Button onClick={clearPoints}>clear points</Button>
          </div>
        </header>
      </div>
    );
  }
}

export default connect(state => state)(App);
