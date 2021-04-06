import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../../constants.js';
import { useParams } from 'react-router-dom';

const Container = styled.div`
    background: linear-gradient(-45deg, rgb(245, 247, 248), rgb(237, 241, 242) 100%);
    height: 100vh;
    // Underneath <Toolbar />
    margin-top: 60px;
`;

const SectionContainer = styled.div`
    display: flex;
    // For <Section /> height to be 100%, we need its parent to be height 100% too
    height: 100%;
`;

const Section = styled.div`
    // Make it so that the flex-children don't automatically change width to fit in the container
    flex-shrink: 0;
    background-color: transparent;
    width: 320px;
    height: 100%;
`;

const SectionHeader = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    background-color: ${({ backgroundColor }) => backgroundColor};
    padding-left: 22px;
    padding-right: 22px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
`;

const Project = () => {
    let { slug } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(API_URL + 'sections', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => setData(res['results']));
    }, [])

    return (
        <Container>
            <SectionContainer>
                {data.map((section) => {
                        return (
                            <Section>
                                <SectionHeader backgroundColor={'#' + section.color}>
                                    {section.name}
                                </SectionHeader>
                            </Section>
                        )
                    })
                }
            </SectionContainer>
        </Container>
    );
}

export default Project;