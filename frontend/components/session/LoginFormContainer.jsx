import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import SessionForm from './SessionForm';

const msp = state => ({
  formType: "login",
  errors: state.errors.session
});

const mdp = dispatch => ({
  action: user => dispatch(login(user))
});


export default connect(msp, mdp)(SessionForm);