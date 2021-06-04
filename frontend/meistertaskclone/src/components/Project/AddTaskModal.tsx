import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Text, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react"
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';

const Container = styled.div<{show: boolean}>`
    display: ${(props) => props.show ? 'block' : 'none' };
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(138, 148, 153, 0.8);
`;

const StyledAddTaskModal = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);

    .header-close-container {
        display: flex;
        align-items: center;
    }
`;

const CloseIcon = styled(CloseOutline)`
    margin-left: auto;
    cursor: pointer;
`;

interface Props {
    show: boolean,
    closeProjectDropdown: React.MouseEventHandler<SVGSVGElement>
}

const AddTaskModal = ({ show, closeProjectDropdown }: Props) => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

    return (
        <Container show={show}>
            <StyledAddTaskModal>
                <div className="header-close-container">
                    <Text fontSize="xl">Add Task</Text>
                    <CloseIcon size="15px" onClick={closeProjectDropdown} />
                </div>
                <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="Task Title"
                    focusBorderColor="blue.200"
                />
                <Button colorScheme="blue" size="md">
                    Create Task
                </Button>
        </StyledAddTaskModal>
        </Container>
    );
}

export default AddTaskModal;