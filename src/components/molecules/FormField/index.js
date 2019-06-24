import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'theme';

import Input from '../../atoms/Input'
import Label from '../../atoms/Text/Label'
import Placeholder from '../../atoms/Text/Placeholder'

const Wrapper = styled.div`
  position: relative;
`;

const InputPlaceholder = styled(Placeholder)`
  font-weight: normal;
  position: absolute;
  top: -6px;
  left: 12px;
  padding: 0 0.25rem;
  :focus {
    color: red !important;
  }
  ${({ focus }) => focus && css`top: 0`};
`;

const FormField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const hasError = touched[field.name] && errors[field.name];
  
  return (
    <Wrapper>
      <InputPlaceholder color={hasError ? colors.ERROR : colors.GRAY}>{props.ariaLabel}</InputPlaceholder>
      <Input error={hasError} {...field} {...props} />
      <Label color={colors.ERROR}>{ hasError && errors[field.name] }</Label>
    </Wrapper>
  );
};


export default FormField;
