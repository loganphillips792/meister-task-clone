import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { createGlobalStyle } from 'styled-components';
import variables from './variables';

const Container = styled.div`
  height: 100%;
`;

const GlobalStyle = createGlobalStyle`
  ${variables}
  body {
    background-color: var(--dark-color);
  }
`;

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/random")
        .then(response => response.json())
        .then(data => {
            console.log("DATA", data)
            setData(data);
        })
}, [])

  return (
    <Container>
      <GlobalStyle />
      <h1>Response from server: {data}</h1>
    </Container>
  );
}

export default App;
