import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginAction } from '../../../actions';
import LoginForm from '../../organisms/LoginForm';

import ViewWrapper from '../../common/ViewWrapper/ViewWrapper';


const Login = (props) => {
  return (
    <ViewWrapper>
      <LoginForm />
    </ViewWrapper>
  )
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginAction
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(Login);

