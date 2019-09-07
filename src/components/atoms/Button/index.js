import theme from 'theme';

import styled, { css } from 'styled-components';

const Button = styled.button`
  background: white;
  border-radius: 6px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.1s ease-out;
  font-weight: 600;
  ${({ size }) => size && css`${theme.buttonSizes[size]}`}
  ${({ variant }) => variant && css`${theme.buttonTypes[variant]}`}
  
  :hover {
    ${({ variant }) => variant && css`${theme.buttonTypes[variant].hover}`}
  }
  
  :disabled {
    background: #9e9e9e;
  }
  :disabled:hover {
    background: #9e9e9e;
  }
`;


Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
};

export default Button;
