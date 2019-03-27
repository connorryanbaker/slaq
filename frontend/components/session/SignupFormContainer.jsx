import { connect } from 'react-redux';
import { signUp, clearErrors } from '../../actions/session_actions';
import SessionForm from './SessionForm';
import { withRouter } from 'react-router-dom';

const msp = state => ({
  formType: "signup",
  errors: state.errors.session
});

const mdp = dispatch => ({
  action: user => dispatch(signUp(user)),
  clearErrors: () => dispatch(clearErrors())
});


export default withRouter(connect(msp, mdp)(SessionForm));