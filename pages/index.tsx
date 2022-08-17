import type { NextPage } from "next";
import tw from "tailwind-styled-components/dist/tailwind";
const Home: NextPage = () => {
    return (
        <>
            <HomeItemContainer>
                <h1>Contents Here</h1>
            </HomeItemContainer>
        </>
    );
};

export default Home;

const HomeItemContainer = tw.div`
flex
flex-col
items-center
w-screen
pt-[10vh]
`;
