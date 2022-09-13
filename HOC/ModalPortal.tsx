import React, { useState, useEffect, ReactNode, Dispatch } from "react";
import { createPortal } from "react-dom";
import tw from "tailwind-styled-components";
import { useTheme } from "../components/context/Theme";
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components";

interface propType {
    showModal: Boolean;
    setShowModal: Dispatch<React.SetStateAction<Boolean>>;
    children: ReactNode;
}

const ModalPortal = (props: propType) => {
    const { themeColorset } = useTheme();
    const [render, setRender] = useState(props.showModal);

    const onClickCloseBtn = () => {
        setRender(false);
        props.setShowModal(false);
    }
    
    useEffect(() => {
        if (props.showModal) setRender(true);
        else
            setTimeout(() => {
                setRender(false);
            }, 200);
    }, [props.showModal]);

    return render ? (
        createPortal(
            <>
                <ModalOverlay/>
                <ModalWrapper> 
                    <ModalContainer  style={{backgroundColor: themeColorset.bgColor, maxHeight: '60vh'}}>
                        <ModalHeader>
                            <CloseIcon style={{marginRight: '15px', marginTop: '15px'}} onClick={onClickCloseBtn}/>
                        </ModalHeader>
                        <div style={{ width: '100%', height: '95%'}}>
                            {props.children}
                        </div>
                    </ModalContainer>
                </ModalWrapper>
            </>,
            document.querySelector('#modal-portal') as HTMLDivElement
    )) : (
        <></>
    );
};

const ModalContainer = styled.div`
width: 60vw; height: 600px;
z-index: 200;
border-radius: 20px;
padding: 15px;
`

const ModalHeader = tw.div`
flex justify-end
h-[5%]
`

const ModalOverlay = styled.div`
position: absolute;
width: 100vw; height: 100vh; z-index: 100;
top: 0;
background-color: black; opacity: 60%;
`

const ModalWrapper = styled.div`
position: absolute;
width: 100vw; height: 100vh; z-index: 200;
top: 0;
display: flex; justify-content: center; align-items: center
`

export default ModalPortal;