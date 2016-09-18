//import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

import React from 'react';
import styles from './styles.js';

/*class App extends Component {
  render() {
    return (
      <div className="App" style={styles.container}>
        <div style={styles.header}>
          <img src="./dist/images/logo.svg" alt="logo" style={styles.logo} />
          <h2>Welcome to React</h2>
        </div>
        <p style={styles.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  },
}*/

const App = ({ name }) => (
  <div className="App" style={styles.container}>
    <div style={styles.header}>
      <img src="./dist/images/logo.svg" alt="logo" style={styles.logo} />
      <h2>Welcome to React, {`${name}!`}</h2>
    </div>
    <p style={styles.intro}>
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);
App.propTypes = { name: React.PropTypes.string.isRequired };
App.defaultProps = { name: 'Lanti' };

export default App;
