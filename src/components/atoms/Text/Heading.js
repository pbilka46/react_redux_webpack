import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from "styled-components";
import { textBase, textProps, textDefaults } from './textBase';
import { withDynamicTag } from '../../common/DynamicTag';
import Label from "./Label";


const H1 = styled.h1`
  ${textBase};
  margin-bottom: 15px;
`;


const Heading = withDynamicTag(H1)

Heading.propTypes = textProps;

Heading.defaultProps = textDefaults;

export default Heading;
