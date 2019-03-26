import React from 'react';
import LandingNav from './LandingNav';
import Splash from './Splash';

class LandingPage extends React.Component {
  render() {
    return (<div className='landing-page-container'>
      <LandingNav />
      <Splash />
    </div>);
  }
}

export default LandingPage;