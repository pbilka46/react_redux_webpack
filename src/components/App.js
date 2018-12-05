import React from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';

import icons from '../assets/icons';
import Navigation from "./common/Navigation/Navigation";

// 555b6e-89b0ae-bee3db-faf9f9-ffd6ba
console.log(icons)
library.add(icons);

const Wrapper = styled.div`
  min-height: 100vh;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Wrapper>
        <Navigation />
      </Wrapper>
    );
  }
}

export default App;
