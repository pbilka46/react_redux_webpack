import React from 'react';
import styled from 'styled-components';
import { library} from '@fortawesome/fontawesome-svg-core';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';

import icons from '../assets/icons';
import Navigation from './common/Navigation/Navigation';
import Login from './pages/login/Login';
import Signup from './pages/Signup';
import Group from './pages/Group';

// 555b6e-89b0ae-bee3db-faf9f9-ffd6ba
// console.log(icons);
library.add(icons);

const Wrapper = styled.div`
  height: 100vh;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Wrapper>
        <Navigation />
        <Router>
          <React.Fragment>
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/group" component={Group} />
          </React.Fragment>
        </Router>
      </Wrapper>
    );
  }
}

export default App;
