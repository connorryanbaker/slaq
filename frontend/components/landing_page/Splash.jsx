import React from 'react';
import { connect } from 'react-redux';
import { receiveErrors, clearErrors } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import SplashEmailForm from './SplashEmailForm';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imgs: ["assets/slaq_landing1-325b5daab2481e4b8aed6b3b676a482ae90cf7715fc65ca840b83faa520022cf.jpg",
        "assets/slaq_landing2-ad63d80c5a92c55049a7a39ba0a79d90937e06ebedd202e5ef2c20aef651e016.jpg",
        "assets/slaq_landing3-5e61062ed1fa1ee54ad6099bbcb90d6e86e8f9e43f85d6974adab9938f5a7cfb.jpg"],
      imgCaptions: ["Away transforms creativity and customer support with slaq", "Molly Moon creates a recipe for success with slaq", "Auto Desk fosters open communication with slaq"]
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const imgs = Array.from(document.getElementsByClassName('splash-img'));
      let newImgs = this.state.imgs;
      newImgs.push(newImgs.shift());
      let newCaptions = this.state.imgCaptions;
      newCaptions.push(newCaptions.shift());
      this.setState({
        imgs: newImgs,
        imgCaptions: newCaptions
      });
    }, 4000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors === prevProps.errors) {
      const imgs = Array.from(document.getElementsByClassName('splash-img'));
      setTimeout(() => {
        imgs.forEach(e => e.classList.add('fade'));
        setTimeout(() => {
          imgs.forEach(e => e.classList.remove('fade'));
        },350);
      }, 15);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const errors = this.props.errors.length > 0 ? <div class="splash-errors">{this.props.errors[0]}</div> : ""
    return (
      <div className="splash-container">
        <h1 className="splash-header">Imagine what you'll<br/> accomplish together</h1>
        <p className="splash-paragraph">slaq is a collaboration hub for work, no matter what work you do. It’s a place where conversations happen, decisions are made, and information is always at your fingertips. With slaq, your team is better connected.</p>
        {errors}
        <SplashEmailForm />
        <img className="splash-img-left splash-img" src={this.state.imgs[0]}/>
        <div className="splash-img-center splash-img">
          <img className="main-img splash-img" src={this.state.imgs[1]}/>
          <figcaption className="splash-caption splash-img">{this.state.imgCaptions[0]}</figcaption>
        </div>
        <img className="splash-img-right splash-img" src={this.state.imgs[2]}/>
      </div>
    );
  }
}

const msp = state => ({
  errors: state.errors.session
});

const mdp = dispatch => ({
  receiveErrors: errors => dispatch(receiveErrors(errors)),
  clearErrors: () => dispatch(clearErrors())
});

export default withRouter(connect(msp,mdp)(Splash));