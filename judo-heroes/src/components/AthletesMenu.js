// src/components/AthletesMenu.js
import React, { Component } from 'react';
import { Link } from 'react-router';
import athletes from '../data/athletes';

class AthletesMenu extends Component {
  render() {
    return (
      <nav className="atheletes-menu">
        {athletes.map(menuAthlete => {
          return <Link key={menuAthlete.id} to={`/athlete/${menuAthlete.id}`} activeClassName="active">{menuAthlete.name}</Link>;
        })}
      </nav>
    );
  }
}

export default AthletesMenu;
