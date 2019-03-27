import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login, clearErrors } from '../../actions/session_actions';
import SessionForm from './SessionForm';

const msp = state => ({
  formType: "login",
  errors: state.errors.session
});

const mdp = dispatch => ({
  action: user => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors())
});


export default withRouter(connect(msp, mdp)(SessionForm));