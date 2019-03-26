import React from 'react';
import LandingNav from '../landing_page/LandingNav';
import SignupFormContainer from './SignupFormContainer';
import LoginFormContainer from './LoginFormContainer';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cpt = this.props.cpt === "signup" ? <SignupFormContainer /> : <LoginFormContainer />
    return (
      <div className="signup-page-container">
        <LandingNav />
        <main className="signup-main">
          {cpt}
        </main>
      </div>
    );
  }
}

export default SignupPage;