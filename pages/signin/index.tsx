import type { NextPage } from "next";
import SignInForm from "../../components/auth/SignInForm";
import SocialLogins from "../../components/auth/SocialLogins";
import tw from "tailwind-styled-components";

const SignIn: NextPage = () => {
    return (
        <>
            <SigninConatiner>
                <SigninWrap>
                    <SignInForm />
                    <SocialLogins />
                </SigninWrap>
            </SigninConatiner>
        </>
    );
};

export default SignIn;

const SigninConatiner = tw.section`
flex justify-center items-center w-screen h-[90vh] text-[#366C95] mt-[10vh]
`;

const SigninWrap = tw.div`
flex flex-col items-center w-[450px] h-[600px] bg-white rounded-xl shadow-xl
`;
