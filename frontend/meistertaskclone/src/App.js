import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Home from './components/Home/index';
import Project from './components/Project/Project.js';
import Dashboard from './components/Dashboard/Dashboard.js';

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
            <Project />
          </Route>
        </Switch>
      </Router>  
    </Container>
  );
}

export default App;
