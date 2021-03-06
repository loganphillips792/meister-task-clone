import React, { useState, useRef, MouseEvent } from 'react';
import styled from 'styled-components';
import { API_URL } from '../../constants.js';
import { usePopper } from 'react-popper';
import { Text, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { MagnifyingGlass } from '@styled-icons/entypo/MagnifyingGlass';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { motion, AnimatePresence } from 'framer-motion';


const Container = styled.div`
`;

const StyledProjectPopover = styled(motion.div)`
    width: 320px;
    padding: 20px;
    background-color: #FFFFFF;    
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 30px -10px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px;
`;

const ProjectDropdown = styled.div`

    .header-close-container {
        display: flex;
        align-items: center;
    }
`;

const CloseIcon = styled(CloseOutline)`
    margin-left: auto;
    cursor: pointer;
`;

interface ProjectPopoverProps {
    referenceElement: HTMLDivElement | null,
    showProjectDropdown: boolean,
    closeProjectDropdown: React.MouseEventHandler<SVGSVGElement>
}


//  https://dev.to/tannerhallman/using-usepopper-to-create-a-practical-dropdown-5bf8 
const ProjectPopover: React.FC<ProjectPopoverProps> = ({ referenceElement, showProjectDropdown, closeProjectDropdown }) => {

    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: 'arrow',
                options:
                {
                    element: arrowElement
                }
            }, {
                name: "offset",
                enabled: true,
                options: {
                    offset: [0, 10]
                }
            }],
    });

    return (
        <Container ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            <AnimatePresence>
                {showProjectDropdown && (
                    <StyledProjectPopover key="modal" animate={{ opacity: [0, 1] }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                        <ProjectDropdown>
                            <div className="header-close-container">
                                <Text fontSize="xl">Projects</Text>
                                <CloseIcon size="15px" onClick={closeProjectDropdown} />
                            </div>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<MagnifyingGlass />}
                                />
                                <Input
                                    placeholder="Search projects"
                                    focusBorderColor="blue.200"
                                />
                            </InputGroup>
                        </ProjectDropdown>
                        <div ref={setArrowElement} style={styles.arrow} />
                    </StyledProjectPopover>
                )
                }
            </AnimatePresence>
        </Container>
    )
}

export default ProjectPopover;