import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Text, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react"
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { usePopper } from 'react-popper';

const Container = styled.div`

`;

const StyledEditSectionDetailsPopover = styled.div`
    width: 320px;
    padding: 20px;
    background-color: #FFFFFF;    
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 30px -10px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px;
`;

interface SectionPopoverProps {
    referenceElement: HTMLDivElement | null,
    show: boolean
}

const EditSectionDetailsPopover = ({ referenceElement, show }: SectionPopoverProps) => {
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
    return(
        <Container ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            {show &&
                <StyledEditSectionDetailsPopover>
                    <div ref={setArrowElement} style={styles.arrow} />
                </StyledEditSectionDetailsPopover>
            }
        </Container>
    );
}

export default EditSectionDetailsPopover;