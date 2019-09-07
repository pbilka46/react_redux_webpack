import styled from 'styled-components';

const Message = styled.div`
  border-radius: 999px;
  display: inline-block;
  padding: 0.425rem 0.625rem;
  margin: 0.625rem;
  background: ${({ primary }) => primary ? '#979498' : '#252d39'};
  color: #FFF;
  font-weight: 500;
`;

export default Message;
