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
            <h1>Project slug: {slug}</h1>
        </Container>
    );
}

export default Project;