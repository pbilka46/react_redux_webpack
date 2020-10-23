import React from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import icons from '../assets/icons';
import Navigation from './common/Navigation/Navigation';
import Login from './pages/login/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Groups from './pages/Groups';
import GroupCreate from './pages/GroupCreate';

library.add(icons);

const Wrapper = styled.div`
  height: 100vh;
`;

const App = () =>  (
  <Wrapper>
    <Router>
      <React.Fragment>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signin" exact component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/chat" component={Chat} />
          <Route path="/groups" exact component={Groups} />
          <Route path="/groups/create" component={GroupCreate} />
        </Switch>
      </React.Fragment>
    </Router>
  </Wrapper>
);

export default App;
