import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

import styles from './styles.js';

class App extends Component {
  render() {
    return (
      <div className="App" style={styles.App}>
        <div style={styles.AppHeader}>
          <img src="./dist/images/logo.svg" alt="logo" style={styles.AppLogo} />
          <h2>Welcome to React</h2>
        </div>
        <p style={styles.AppIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
