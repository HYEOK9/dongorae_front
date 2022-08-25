import type { NextPage } from "next";
import SignInForm from "../../components/auth/signIn/SignInForm";
import SocialLogins from "../../components/auth/signIn/SocialLogins";
import tw from "tailwind-styled-components";
import { useTheme } from "../../components/context/Theme";

const SignIn: NextPage = () => {
    const { themeColorset } = useTheme();

    return (
        <>
            <SigninConatiner>
                <SigninWrap style={{ backgroundColor: themeColorset.bgColor }}>
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
flex flex-col items-center w-[450px] h-[600px] rounded-xl shadow-2xl
`;
