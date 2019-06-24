import React, { useEffect } from 'react';
import styled from 'styled-components';

import { DARK_BLUE } from 'theme';

import Heading from '../../atoms/Text/Heading';

const Wrapper = styled.div`
  background: ${DARK_BLUE};
`
const Group = ({ select, unSubscribe, subscribeGroup, group }) => {
  useEffect(() => {
    subscribeGroup(group);
    
    return function cleanup() {
      unSubscribe(group)
    }
  });
  
  const handleClick = () => {
    select(group)
  };
  return (
    <div onClick={handleClick}>
      <Heading tag="h3">Grupy do których dołączyłeś</Heading>
      {group.name}
    </div>
  )
};

const Groups = ({ select, groups, subscribeGroup, unSubscribeGroup }) => {
  return (
    <Wrapper>
      {groups.map(group => (
        <Group
          select={select}
          unSubscribe={unSubscribeGroup}
          subscribeGroup={subscribeGroup}
          group={group}
        />))
      }
    </Wrapper>
  );
};

export default Groups;

