import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../../constants.js';
import { useParams } from 'react-router-dom';

const Container = styled.div`
`;


const Project = () => {
    let { slug } = useParams();

    return (
        <Container>
            <Toolbar />
            <h1>Project slug: {slug}</h1>
        </Container>
    );
}

const StyledToolbar = styled.div`
    user-select: none;
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
    height: 60px;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px 0px;
    z-index: 1;
`;

const Toolbar = () => {

    return (
        <StyledToolbar>
            
        </StyledToolbar>
    );
}

export default Project;