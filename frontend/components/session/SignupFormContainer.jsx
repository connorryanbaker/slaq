import { connect } from 'react-redux';
import { signUp } from '../../actions/session_actions';
import SessionForm from './SessionForm';

const msp = state => ({
  formType: "signup",
  errors: state.errors.session
});

const mdp = dispatch => ({
  action: user => dispatch(signUp(user))
});


export default connect(msp, mdp)(SessionForm);