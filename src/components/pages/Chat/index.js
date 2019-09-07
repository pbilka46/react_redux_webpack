import React, { useEffect } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserGroups, getRecentMessages, sendMessage } from '../../../actions';
import {getSelectedGroup} from '../../../reducers';

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
    
    @media (min-width: 768px) {
      
    }
  }
`;

const Chat = ({ getGroups, sendMessage, getRecentMessages, selectedGroup }) => {
  useEffect(() => {
    getGroups();
    if (selectedGroup) {
      getRecentMessages();
    }
  });
  return (
    <Wrapper>
      <Groups selectedGroup={selectedGroup} />
      <Messages selectedGroup={selectedGroup} sendMessage={sendMessage} selected={selectedGroup} />
    </Wrapper>
  )
};

const mapStateToProps = (state) => {
  return {
    selectedGroup: getSelectedGroup(state.window)
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getGroups: getUserGroups,
    sendMessage,
    getRecentMessages
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

