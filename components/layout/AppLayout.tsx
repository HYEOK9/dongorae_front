import React from "react";
import Header from "./header/Header";
import tw from "tailwind-styled-components";

type propType = {
    children: React.ReactNode;
};

function AppLayout({ children }: propType) {
    return (
        <Container>
            <Header />
            {children}
        </Container>
    );
}

export default AppLayout;

const Container = tw.div`
flex
flex-col
w-screen
h-screen
`;
