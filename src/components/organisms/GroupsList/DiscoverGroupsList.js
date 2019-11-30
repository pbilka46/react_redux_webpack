import React, { useEffect } from 'react';
import styled from 'styled-components';

import { DARK_BLUE } from 'theme';

import Heading from '../../atoms/Text/Heading';

import Group from '../../molecules/Group';

const Wrapper = styled.div`
  background: ${DARK_BLUE};
  color: #FFF;
`;

const GroupsList = ({
                      groups, select, subscribeGroup, unSubscribeGroup, selectedGroup
                    }) => (
  <Wrapper>
    <Heading
      color="#FFF"
      tag="h3"
    >
      Twoje grupy
    </Heading>
    {groups.map(group => (
      <Group
        group={group}
        selected={selectedGroup === group.id}
        select={select}
        unSubscribe={unSubscribeGroup}
        subscribeGroup={subscribeGroup}
      />
    ))
    }
  </Wrapper>
);

export default GroupsList;
