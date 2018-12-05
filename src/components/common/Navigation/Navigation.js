import React from 'react';
import styled from 'styled-components';

import IconButton from '../buttons/IconButton';

const Header = styled.div`
  background: #555b6e;
  padding: 0.625rem 1.25rem;
  display: flex;
  justify-content: space-between;
`;

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Header>
        <IconButton icon="user" />
        <IconButton icon="ellipsis-h" />
      </Header>
    )
  }
}

export default Navigation;
