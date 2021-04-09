import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Rocket from '../../images/rocket.png';
import ProjectPopover from './ProjectPopover.js';
import { Home } from '@styled-icons/heroicons-outline/Home';
import { InfoCircle } from '@styled-icons/bootstrap/InfoCircle';
import { PlusCircle } from '@styled-icons/bootstrap/PlusCircle';
import { Timeline } from '@styled-icons/fluentui-system-regular/Timeline';
import { CheckCircle } from '@styled-icons/bootstrap/CheckCircle';
import { Bell } from '@styled-icons/bootstrap/Bell';
import { MagnifyingGlass } from '@styled-icons/entypo/MagnifyingGlass';
import AddTaskModal from './AddTaskModal';

const StyledToolbar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
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

const IconMargins = css`
    margin-left: 24px;
    margin-right: 24px;
`;

const HomeIcon = styled(Home)`
    ${IconMargins}
`;

const InfoIcon = styled(InfoCircle)`
    ${IconMargins}
`;

const ColumnTwo = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const TimeLineIcon = styled(Timeline)`
    ${IconMargins}
`;

const AddTaskIcon = styled(PlusCircle)`
    ${IconMargins}
`;

const CheckCircleIcon = styled(CheckCircle)`
    ${IconMargins}
`;

const BellIcon = styled(Bell)`
    ${IconMargins}
`;

const MagnifyingGlassIcon = styled(MagnifyingGlass)`
    ${IconMargins}
`;

const NameCircle = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    color: #FFFFFF;
    background-color: rgb(138, 148, 153);
`;

const Toolbar = () => {
    const [referenceElement, setReferenceElement] = useState(null);

    const [showProjectDropdown, setShowProjectDropdown] = useState(false);

    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    const iconsSize = "24px";

    return (
        <StyledToolbar>
            <ColumnOne>
                <HomeIcon size={iconsSize} />
                <VerticalLine />
                <ProjectPicker ref={setReferenceElement} onClick={() => setShowProjectDropdown(!showProjectDropdown)}>
                    <div class="project-image"></div>
                    <div class="project-name">VRware Webapp Development Team</div>
                </ProjectPicker>
               <VerticalLine />
               <ProjectPopover
                    referenceElement={referenceElement} 
                    showProjectDropdown={showProjectDropdown}
                    closeProjectDropdown={() => setShowProjectDropdown(false)}
                />
                <InfoIcon size={iconsSize} />
            </ColumnOne>
            <ColumnTwo>
                <AddTaskIcon size={iconsSize} onClick={() => setShowAddTaskModal(true)} />
                <VerticalLine />
                <TimeLineIcon size={iconsSize} />
                <VerticalLine />
                <CheckCircleIcon size={iconsSize} />
                <BellIcon size={iconsSize} />
                <VerticalLine />
                <MagnifyingGlassIcon size={iconsSize} />
                <NameCircle>
                    LP
                </NameCircle>
            </ColumnTwo>
            <AddTaskModal show={showAddTaskModal} closeProjectDropdown={() => setShowAddTaskModal(false)} />
        </StyledToolbar>
    );
}

export default Toolbar;