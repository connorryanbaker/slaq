import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
  
  render() {
    return (
      <div>
        <div>
          <h1>Imagine what you'll accomplish together psych nah</h1>
          <div>
            <img src="assets/slaq_landing1-325b5daab2481e4b8aed6b3b676a482ae90cf7715fc65ca840b83faa520022cf.jpg
  "/>
            <img src="assets/slaq_landing2-ad63d80c5a92c55049a7a39ba0a79d90937e06ebedd202e5ef2c20aef651e016.jpg"/>
            <img src="assets/slaq_landing3-5e61062ed1fa1ee54ad6099bbcb90d6e86e8f9e43f85d6974adab9938f5a7cfb.jpg"/>
          </div>
        </div>
        <Link to={'/signup'}>Sign Up</Link>
        <Link to={'/login'}>Log In</Link>
      </div>
    );
  }
}

export default Splash;