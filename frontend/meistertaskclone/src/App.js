import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Home from './components/Home/index';
import Project from './components/Project/project.js';

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
          <Route exact path="/app/project/:slug">
            <Project />
          </Route>
        </Switch>
      </Router>  
    </Container>
  );
}

export default App;
