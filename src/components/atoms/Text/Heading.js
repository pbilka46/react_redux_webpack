import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from "styled-components";
import { textBase, textProps, textDefaults } from './textBase';
import { withDynamicTag } from '../../common/DynamicTag';
import Label from "./Label";

const headingStyles = {
  h1: {
    fontSize: '2rem'
  },
  h2: {
    fontSize: '1.225rem'
  }
};

const H1 = styled.h1`
  ${textBase};
  ${({ tag }) => tag && css`${headingStyles[tag]}`};
  ${({color}) => color && css`color: ${color}`};
`;


const Heading = withDynamicTag(H1);

Heading.propTypes = textProps;

Heading.defaultProps = textDefaults;

export default Heading;
