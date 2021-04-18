import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../../constants.js';

const Container = styled.div`

`;

const Home: React.FC = () => {

    const [testResponseData, setTestResponseData] = useState('');

    useEffect(() => {
        fetch(API_URL+'tasks/test', {
            method: 'GET', 
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => setTestResponseData(res['msg']));
    }, [])

    return (
        <Container>
            <h1>Home page</h1>
            <p>Server Test: {testResponseData}</p>
        </Container>
    );
}

export default Home;