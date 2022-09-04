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
            <Content>
                {children}
            </Content>
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

const Content = tw.div`
w-screen
h-[calc(100%-70px)]
mt-[70px]
`
