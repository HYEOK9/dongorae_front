import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface propType {
    showSideBar: boolean;
}

const SideBar = (props: propType) => {
    const [render, setRender] = useState(props.showSideBar);

    useEffect(() => {
        if (props.showSideBar) setRender(true);
        else
            setTimeout(() => {
                //사라질 때 애니메이션용 setTimeout
                setRender(false);
            }, 200);
    }, [props.showSideBar]);

    return render ? (
        <>
            <Container showSideBar={props.showSideBar}>
                <h1>친구목록</h1>
                <h1>(로그인 됐을 때만 활성화되게 할 예정)</h1>
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

const Container = styled.div<{ showSideBar: boolean }>`
    display: flex;
    position: fixed;
    top: 10vh;
    left: 60vw;
    flex-flow: column nowrap;
    align-items: center;
    width: 40vw;
    @media screen and (min-width: 640px) {
        width: 21vw;
        left: 79vw;
    }
    border-left: 1px solid #d2e6ff;
    background-color: #dcecff;
    height: 90vh;
    animation: ${(props) => (props.showSideBar ? fadeIn : fadeOut)} 0.2s ease
        forwards;
    overflow-y: scroll;
    z-index: 100;
`;
