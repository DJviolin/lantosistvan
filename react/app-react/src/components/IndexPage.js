// src/components/IndexPage.js
import React, { Component } from 'react';
import AthletePreview from './AthletePreview';
import athletes from '../data/athletes';

class IndexPage extends Component {
  render() {
    return (
      <div className="home">
        <div className="athletes-selector">
          {athletes.map(athleteData => <AthletePreview key={athleteData.id} {...athleteData} />)}
        </div>
      </div>
    );
  }
}

export default IndexPage;
