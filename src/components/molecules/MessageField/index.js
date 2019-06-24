import React, { useState} from 'react';
import styled from 'styled-components';

import TextArea from '../../atoms/TextArea';
import Button from '../../atoms/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MessageField = ({ submitText, sendMessage }) => {
  const [message, setMessage] = useState('');
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  
  const handleSend = () => {
    sendMessage(message);
    setMessage('')
  };
  
  return (
    <Wrapper>
      <TextArea value={message} onChange={handleMessageChange} />
      <Button disabled={message === ''} onClick={handleSend}>{submitText}</Button>
    </Wrapper>
  )
};

export default MessageField;
