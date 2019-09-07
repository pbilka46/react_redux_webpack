import React, { useState} from 'react';
import styled from 'styled-components';

import TextAreaComponent from '../../atoms/TextArea';
import Button from '../../atoms/Button';

const TextArea = styled(TextAreaComponent)`
  border: none;
`;

const Wrapper = styled.form`
  display: flex;
  flex-direction: row;
  box-shadow: 1px 1px 21px 0px rgba(0,0,0,0.75);
`;

const MessageField = ({ submitText, sendMessage }) => {
  const [message, setMessage] = useState('');
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  
  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('')
  };
  
  return (
    <Wrapper onSubmit={handleSend}>
      <TextArea value={message} onChange={handleMessageChange} />
      <Button style={{ display: 'block'}} type="submit" disabled={message === ''}>{submitText}</Button>
    </Wrapper>
  )
};

export default MessageField;
