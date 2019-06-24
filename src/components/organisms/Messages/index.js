import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Message from '../../atoms/Message';
import MessageField from '../../molecules/MessageField';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  padding: 2.25rem;
  > div {
    margin: 1rem 0;
  }
`;

const Messages = ({ messages, sendMessage, selected }) => {
  return (
    <Wrapper>
      <MessagesList>
        { messages.map(message => (<Message>{message.body}</Message>))}
      </MessagesList>
      {
        selected !== null &&
          <MessageField sendMessage={sendMessage} submitText="Wyślij" />
      }
    </Wrapper>
  )
};

export default Messages;
