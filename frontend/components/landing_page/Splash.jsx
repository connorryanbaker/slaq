import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.update = this.update.bind(this);

  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
    }
  }
  render() {
    return (
      <div className="splash-container">
        <h1 className="splash-header">Imagine what you'll<br/> accomplish together</h1>
        <div className="splash-form-container">
          <p className="splash-paragraph">slaq is a collaboration hub for work, no matter what work you do. It’s a place where conversations happen, decisions are made, and information is always at your fingertips. With slaq, your team is better connected.</p>
          <div className="splash-email-input-container">
            <input className="session-input" type="text" placeholder="Email address" onChange={this.update("input")} />
            <Link to='/signup'><button className='btn-purple'>Get Started</button></Link>
          </div>
          <p className="splash-footnote">Already using slaq? <Link className="splash-signin-link" to='/login'>Sign In.</Link></p>
        </div>
        <div>
          <img className="splash-img-left" src="assets/slaq_landing1-325b5daab2481e4b8aed6b3b676a482ae90cf7715fc65ca840b83faa520022cf.jpg
"/>
          <img className="splash-img-center" src="assets/slaq_landing2-ad63d80c5a92c55049a7a39ba0a79d90937e06ebedd202e5ef2c20aef651e016.jpg"/>
          <img className="splash-img-right" src="assets/slaq_landing3-5e61062ed1fa1ee54ad6099bbcb90d6e86e8f9e43f85d6974adab9938f5a7cfb.jpg"/>
        </div>
      </div>
    );
  }
}

export default Splash;