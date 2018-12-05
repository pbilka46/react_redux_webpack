import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import * as colors from '../../../assets/colors/colors';

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.875rem;
  border-radius: 999px;
  padding: 0.675rem;
  background: #FFF;
  width: 24px;
  height: 1em;
  cursor: pointer;
  transition: 0.2s;
  color: ${colors.GRAY};
  &:hover {
    background: #d5d5d5;
  }
`;

const propTypes = {
  icon: PropTypes.string
};

function IconButton(props) {
  return (
    <Icon icon={props.icon} />
  )
}

IconButton.propTypes = propTypes;

export default IconButton;
