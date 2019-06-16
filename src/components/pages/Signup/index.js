import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginAction } from '../../../actions';
import SignUpForm from '../../organisms/SignUpForm';

import ViewWrapper from '../../common/ViewWrapper/ViewWrapper';


const lol = (props) => {
  return (
    <ViewWrapper>
      <SignUpForm />
    </ViewWrapper>
  )
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginAction
  }, dispatch);
};

export default lol;

// export default connect(null, mapDispatchToProps)(lol);

