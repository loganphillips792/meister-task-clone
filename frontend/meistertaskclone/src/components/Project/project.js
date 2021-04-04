import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../../constants.js';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faIcons } from '@fortawesome/free-solid-svg-icons';
import Rocket from '../../images/rocket.png';
import ProjectPopover from './ProjectPopover.js';
import { InfoCircle } from '@styled-icons/bootstrap/InfoCircle';

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

const ColumnOne = styled.div`
    display: flex;
    justfiy-content: flex-
    align-items: center;
    flex-grow: 1;
    border: 2px solid green;
`;

const VerticalLine = styled.div`
    width: 1px;
    height: 24px;
    align-self: center;
    background-color: rgb(220, 226, 230);
`;

const ProjectPicker = styled.div`
    display: flex;
    margin-left: 16px;
    margin-right: 16px;

    .project-image {
        background: url(${Rocket});
        background-size: 24px;
        width: 24px;
        height: 24px;
    }

    .project-name {}
`;

const ColumnTwo = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: 2px solid blue;
`;

const HomeIcon = styled(FontAwesomeIcon)`
    margin-left: 24px;
    margin-right: 24px;
`;

const InfoIcon = styled(InfoCircle)`
    margin-left: 24px;
    margin-right: 24px;
`;

const Toolbar = () => {
    const [referenceElement, setReferenceElement] = useState(null);

    const [showProjectDropdown, setShowProjectDropdown] = useState(false);


    return (
        <StyledToolbar>
            <ColumnOne>
                <HomeIcon icon={faHome} />
                
                <VerticalLine />
                
                <ProjectPicker ref={setReferenceElement} onClick={() => setShowProjectDropdown(!showProjectDropdown)}>
                    <div class="project-image"></div>
                    <div class="project-name">VRware Webapp Development Team</div>
                </ProjectPicker>
                
               <VerticalLine />

               <ProjectPopover
                    referenceElement={referenceElement} 
                    showProjectDropdown={showProjectDropdown}
                />

                <InfoIcon size="15px" />
                
            </ColumnOne>
            
            <ColumnTwo>
            </ColumnTwo>
        </StyledToolbar>
    );
}

export default Project;