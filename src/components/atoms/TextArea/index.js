import { colors } from 'theme';
import React from 'react'
import styled, { css } from 'styled-components';
import { textBase, textProps, textDefaults } from '../Text/textBase';
import Paragraph from "../Text/Paragraph";

const buttonTypes = {
  primary: 'primary',
  secondary: 'secondary',
};

const Input = styled.input`
  ${textBase};
  resize: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  padding: 18.5px 5px;
  text-indent: 10px;
  border: 1px solid;
  border-radius:4px;
  transition: background-color 0.1s ease-out;
  font-weight: 400;
  width: 100%;
  border-color: ${({ error }) => error ? `${colors.ERROR}` : `${colors.GRAY}`};
`;


const xd = (props) => {
  return <Input {...props}/>
};


Input.propTypes = textProps;


Input.defaultProps = {
  ...textDefaults,
  variant: 'primary',
  size: 'medium',
};

export default Input;
