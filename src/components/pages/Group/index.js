import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getGroups, sendMessage } from '../../../actions';
import {getSelectedGroup} from '../../../reducers';

import ViewWrapper from '../../common/ViewWrapper/ViewWrapper';
import Groups from '../../containers/Groups';
import Messages from '../../containers/Messages';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-top: 64px;
  min-height: 100%;
  > div:first-child {
    width: 280px;
  }
`;

const Group = (props) => {
  
  useEffect(() => {
    props.getGroups();
  });
  
  return (
    <Wrapper>
      <Groups />
      <Messages sendMessage={props.sendMessage} selected={props.selected} />
    </Wrapper>
  )
};

const mapStateToProps = (state) => {
  return {
    selected: getSelectedGroup(state.messages)
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getGroups,
    sendMessage
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);

