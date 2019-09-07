import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Message from '../../atoms/Message';
import MessageField from '../../molecules/MessageField';

import List from '../List';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const MessageWrapper = styled.div`
`;

const MessageFieldBar = styled.div`
  background: #fff;
`


const renderMessage = (id, message, styles) => {
  // console.log('message', message);
  return (
    <MessageWrapper style={styles} key={id}>
      <Message primary={message.belongs_to_user}>{message.body}</Message>
    </MessageWrapper>
  )
};


const Messages = ({ messages, sendMessage, selected }) => {
  return (
    <Wrapper>
      <List
        length={messages.length}
      >
        {
          (id, isScrolling, styles) => (renderMessage(id, messages[id], styles))
        }
      </List>
      {
        selected !== null &&
          <MessageFieldBar>
            <MessageField sendMessage={sendMessage} submitText="Wyślij" />
          </MessageFieldBar>
      }
    </Wrapper>
  )
};

export default Messages;
