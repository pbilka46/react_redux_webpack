import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { DARK_BLUE, LIGHT_BLUE, LIGHT_RED } from 'theme';

const Wrapper = styled.div`
  cursor: pointer;
  background: ${DARK_BLUE};
  border-left: 6px solid ${DARK_BLUE};
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  padding: 0.875rem;
  &:hover {
    //background: red;
  }

  ${({ selected }) => selected && css`
    background: ${LIGHT_BLUE}
    border-color: ${LIGHT_RED}
  `};
`;

const Group = ({
  select, unSubscribe, subscribeGroup, group, selected
}) => {
  useEffect(() => {
    subscribeGroup(group);

    return function cleanup() {
      unSubscribe(group);
    };
  });

  const handleClick = () => {
    select(group);
  };
  return (
    <Wrapper selected={selected} onClick={handleClick}>
      {group.name}
    </Wrapper>
  );
};

Group.propTypes = {
  select: PropTypes.func,
  unSubscribe: PropTypes.func,
  subscribeGroup: PropTypes.func,
  group: PropTypes.object
};

export default Group;
