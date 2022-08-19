import type { NextPage } from "next";
import SignUpForm from "../components/auth/signUp/SignUpForm";
import tw from "tailwind-styled-components/dist/tailwind";

const Join: NextPage = () => {
    return (
        <>
            <JoinContainer>
                <JoinDiv>
                    <SignUpForm />
                </JoinDiv>
            </JoinContainer>
        </>
    );
};

export default Join;

const JoinContainer = tw.section`
flex justify-center items-center w-screen h-[90vh] mt-[10vh]
`;

const JoinDiv = tw.div`
flex flex-col items-center w-[450px] h-[600px] bg-white rounded-xl shadow-xl
`;
