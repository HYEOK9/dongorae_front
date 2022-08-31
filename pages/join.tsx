import type { NextPage } from "next";
import SignUpForm from "../components/auth/signUp/SignUpForm";
import tw from "tailwind-styled-components/dist/tailwind";
import { useTheme } from "../components/context/Theme";
const Join: NextPage = () => {
    const { themeColorset } = useTheme();

    return (
        <>
            <JoinContainer>
                <JoinDiv style={{ backgroundColor: themeColorset.bgColor }}>
                    <SignUpForm />
                </JoinDiv>
            </JoinContainer>
        </>
    );
};

export default Join;

const JoinContainer = tw.section`
flex justify-center items-center w-screen h-[90vh]
`;

const JoinDiv = tw.div`
flex flex-col items-center w-[450px] h-[600px] rounded-xl shadow-2xl
`;
