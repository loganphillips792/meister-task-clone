import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { API_URL } from '../../constants.js';
import { useParams } from 'react-router-dom';
import { CaretDownFill } from '@styled-icons/bootstrap/CaretDownFill'
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"
import { AddCircle } from '@styled-icons/fluentui-system-filled/AddCircle';
import { Add } from '@styled-icons/fluentui-system-filled/Add';

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

    // Make every other <Section /> have different background color than the background
    &:nth-child(even) {
        background-color: #edf0f1;
    }
`;

interface SectionHeaderProps {
    backgroundColor: string,
    // onMouseEnter: React.MouseEventHandler<HTMLDivElement>,
    // setCurrentSectionHoverIndex: ,
    // onMouseLeave: React.MouseEventHandler<HTMLDivElement>, 
    // setShowCaret: , 
}

const SectionHeader = styled.div<SectionHeaderProps>`
    height: 60px;
    display: flex;
    align-items: center;
    background-color: ${({ backgroundColor }) => backgroundColor};
    padding-left: 22px;
    padding-right: 22px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    cursor: grab;
    
    .name {}

    .caret-task-count-container {
        display: flex;
        align-items: center;
        // put last flex item to end of container
        margin-left: auto;

        .task-count {
            
            padding: 3px 10px;
            border-radius: 12px;
            background-color: rgba(0, 0, 0, 0.05);
            cursor: pointer;
    
            & > div {
                color: rgba(255, 255, 255);
                font-size: 13px;
                line-height: 18px;
                font-weight: 500;
                letter-spacing: normal;
            }
        }
    }
`;

const SectionBody = styled.div`
    padding: 10px 10px 40px;
`;

const AddSectionIcon = styled(Add)``;

interface CaretDownIconInterface {
    show: boolean,
    index: number,
    currentSectionHoverIndex: number
}

const CaretDownIcon = styled(CaretDownFill)<CaretDownIconInterface>`
    color: #FFFFFF;
    opacity: ${({show, index, currentSectionHoverIndex}) => show && (index==currentSectionHoverIndex) ? '1' : '0' };
    cursor: pointer;
`;

const Task = styled.div`
    background-color: #FFFFFF;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.05) 0px 2px 8px 0px;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    padding: 17px; 20px;
    
    // following code is for when a box is being dragged
    //border-color: rgb(0, 170, 255);
    //border-width: 2px;
    
    // So we don't get extra spacing above first task in each section
    &:not(:first-child) {
        margin-top: 15px;
    }
    
`;

const TaskHeader = styled.div``;

const TaskBodyPreview = styled.div``;

const TaskCheckListCount = styled.div``;

// So we can center the Add Task icon
const AddTaskIconContainer = styled.div`
    position: relative;
    height: 50px;

    .background {
        background-color: #8a9499;
        width: 15px;
        height: 15px;
        border-radius: 10px;
        z-index: 1;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const AddTaskCircleIcon = styled(AddCircle)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);    
    color: #FFFFFF;
    z-index: 2;
`;

interface SectionInterface {
    id: string,
    name: string,
    description: string,
    color: string,
    created_at: string,
    updated_at: string,
    task_set: Array<TaskInterface>
}

interface TaskInterface {
    id: string,
    name: string,
    description: string,
    section_id: string,
    due: string,
    created_at: string,
    updated_at: string,
    completed_at: string,
    assigned_to_id: string 
}

const Project: React.FC = () => {
    let { slug } = useParams<{slug: string}>();

    //const [data, setData] = useState([]);
    const [data, setData] = useState<
        Array<
            SectionInterface
        >    
    >([]);

    const [showCaret, setShowCaret] = useState(false);
    const [currentSectionHoverIndex, setCurrentSectionHoverIndex] = useState(-1);

    const [refresh, setRefresh] = useState(false);

    const [tempSection, setTempSection] = useState(false);

    const tempSectionInputRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {        
        fetch(API_URL + 'sections', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => setData(res['results']));

        /*
            "In React class components, the render method itself shouldn’t cause side effects. It would be too early — we typically want to perform our effects after React has updated the DOM"
        */
        if(tempSection) {
            tempSectionInputRef?.current?.focus();
        }

    }, [refresh])

    const handleEditableInputLeave = (e: React.FocusEvent<HTMLInputElement>, section: SectionInterface | null, isTempSection=false) => {

        // handle the case of creating a new section
        if(isTempSection) {
            if(e.target.value !== "") {
               
                fetch(API_URL + 'sections', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({ name : e.target.value })
                })
                .then(res => res.json())
                .then(res => setRefresh(!refresh)); // trigger a refresh to get the newly created section
            } 
             // remove the temp section
             setTempSection(false);
            return;
        }

        if(section != null) {
            if(e.target.value !== section.name) {
                fetch(API_URL + 'sections/'+ section.id, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({ name : e.target.value, description : section.description, color : section.color, created_at : section.created_at, updated_at : section.updated_at })
                })
                    .then(res => res.json())
                    .then(res => setRefresh(!refresh));
            }
        }
    }

    const handleAddNewSectionClick = () => {
        setTempSection(true);
        // Trigger refresh so we can set focus to the editable input in ComponentDidMount (well, not exactly ComponentDidMount, but basically)
        setRefresh(!refresh);
    }
    
    return (
        <Container>
            <SectionContainer>
                {data.map((section, index) => {
                        return (
                            <Section key={section.id}>
                                <SectionHeader backgroundColor={section.color} onMouseEnter={() => { setShowCaret(true); setCurrentSectionHoverIndex(index); }} onMouseLeave={() => { setShowCaret(false); setCurrentSectionHoverIndex(-1); }}>
                                    <div className="name">
                                        <Editable defaultValue={section.name}>
                                            <EditablePreview />
                                            <EditableInput bgColor="#FFFFFF" onBlur={(e) => handleEditableInputLeave(e, section)} />
                                        </Editable>
                                    </div>
                                    <div className="caret-task-count-container">
                                        
                                        <CaretDownIcon size="15px" index={index} currentSectionHoverIndex={currentSectionHoverIndex} show={showCaret} />
                                        
                                        <div className="task-count">
                                            <div>{section.task_set.length}</div>
                                        </div>
                                    </div>
                                </SectionHeader>
                                
                                <SectionBody>
                                    {section.task_set.map((task, index) => {
                                            return (
                                                <Task key={task.id}>
                                                    <TaskHeader>{task.name}</TaskHeader>
                                                    <TaskBodyPreview>{task.description != "" && task.description}</TaskBodyPreview>
                                                    <TaskCheckListCount></TaskCheckListCount>
                                                </Task>
                                            )
                                        })
                                    }
                                    <AddTaskIconContainer>
                                        {/* We want a add icon after the last task */}
                                        <AddTaskCircleIcon size="28px" />
                                        <div className="background"></div>
                                    </AddTaskIconContainer>
                                </SectionBody>
                               
                            </Section>
                        )
                    })
                }
                {tempSection === true && (
                        <Section>
                            <SectionHeader backgroundColor='#FFD500'>
                                <div className="name">
                                    <Editable>
                                        <EditablePreview ref={tempSectionInputRef}/>
                                        <EditableInput bgColor="#FFFFFF" onBlur={(e) => handleEditableInputLeave(e, null, true)} />
                                    </Editable>
                                </div>
                            </SectionHeader>

                            <SectionBody></SectionBody>
                        </Section>
                    )
                }
                <AddSectionIcon size="16px" onClick={handleAddNewSectionClick}/>
            </SectionContainer>
        </Container>
    );
}

export default Project;