import React, { useState, useEffect, ReactNode, Dispatch } from "react";
import { createPortal } from "react-dom";
import tw from "tailwind-styled-components";
import { useTheme } from "../components/context/Theme";
import CloseIcon from '@mui/icons-material/Close';

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
                        <ModalHeader><CloseIcon onClick={onClickCloseBtn}/></ModalHeader>
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

const ModalWrapper = tw.div`
absolute
w-[100vw] h-[100vh] 
top-[0]
flex justify-center items-center
`

const ModalContainer = tw.div`
w-[60vw] h-[600px] z-[200]
rounded-[20px]
p-[15px]
`

const ModalHeader = tw.div`
flex justify-end
h-[5%]
`

const ModalOverlay = tw.div`
absolute
w-[100vw] h-[100vh] z-[50]
top-[0]
bg-black opacity-[60%]
`

export default ModalPortal;