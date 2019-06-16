import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from "styled-components";
import { textBase, textProps, textDefaults } from './textBase';
import { withDynamicTag } from '../../common/DynamicTag';

const tags = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6'
};

const Heading = styled.h1`
  ${textBase};
  margin-bottom: 15px;
`;


Heading.propTypes = {
  ...textProps,
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ]),
};

Heading.defaultProps = textDefaults;

export default withDynamicTag(Heading, tags);
