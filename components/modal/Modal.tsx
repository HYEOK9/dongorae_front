import React, { useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import tw from "tailwind-styled-components";
import { useTheme } from "../context/Theme";

interface propType {
    showModal: Boolean;
    children: ReactNode;
}

const Modal = (props: propType) => {
    const { themeColorset } = useTheme();
    const [render, setRender] = useState(props.showModal);
    let portalDiv;
    
    useEffect(() => {
        if (props.showModal) setRender(true);
        else
            setTimeout(() => {
                setRender(false);
            }, 200);
        console.log();
        
    }, [props.showModal]);

    return render ? (
        createPortal(
            <>
                <ModalOverlay/>
                <ModalWrapper> 
                    <ModalContainer  style={{backgroundColor: themeColorset.bgColor}}>
                        {props.children}
                    </ModalContainer>
                </ModalWrapper>
            </>,
            document.querySelector('#modal-portal') as HTMLDivElement
    )) : (
        <></>
    );
};

const ModalWrapper = tw.div`
absolute
w-[100vw] h-[100vh] 
top-[0]
flex justify-center items-center
`

const ModalContainer = tw.div`
w-[60vw] h-[400px] z-[200]
rounded-[20px]
`

const ModalOverlay = tw.div`
absolute
w-[100vw] h-[100vh] z-[50]
top-[0]
bg-black opacity-[60%]
`

export default Modal;