import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface propType {
    isShow: boolean;
}

const SideBar = (props: propType) => {
    const [render, setRender] = useState(props.isShow);
    useEffect(() => {
        if (props.isShow) setRender(true);
        else
            setTimeout(() => {
                setRender(false);
            }, 200);
    }, [props.isShow]);

    return render ? (
        <>
            <Container isShow={props.isShow}>
                <h1>친구목록 여기</h1>
            </Container>
        </>
    ) : (
        <></>
    );
};

export default SideBar;

const fadeIn = keyframes`
  from{transform:translateX(100%)}
  to{transform:translateX(0)}
`;

const fadeOut = keyframes`
  from{transform:translateX(0)}
  to{transform:translateX(100%)}
`;

const Container = styled.div<{ isShow: boolean }>`
    display: flex;
    float: right;
    flex-flow: column nowrap;
    align-items: center;
    width: 40vw;
    @media screen and (min-width: 640px) {
        width: 25vw;
    }
    border-left: 1px solid #d2e6ff;
    background-color: #dcecff;
    height: 90vh;
    animation: ${(props) => (props.isShow ? fadeIn : fadeOut)} 0.2s ease
        forwards;
    overflow-y: scroll;
`;
