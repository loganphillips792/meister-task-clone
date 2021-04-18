import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Home from './components/Home/index';
import Project from './components/Project/Project';
import Toolbar from './components/Project/Toolbar';
import Dashboard from './components/Dashboard/Dashboard';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  useLocation
} from 'react-router-dom';

const Container = styled.div`
`;

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/app/dashboard">
            <Dashboard />
          </Route>
          <Route path="/app/project/:slug">
            <Toolbar />
            <Project />
          </Route>
        </Switch>
      </Router>  
    </Container>
  );
}

export default App;
