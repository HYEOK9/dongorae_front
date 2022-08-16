import NaverLogin from "./NaverLogin";
import KakaoLogin from "./KakaoLogin";
import tw from "tailwind-styled-components";

const SocialLogins = () => {
    return (
        <>
            <SocialLoginsWrapper>
                <NaverLogin />
                <KakaoLogin />
            </SocialLoginsWrapper>
        </>
    );
};

export default SocialLogins;

const SocialLoginsWrapper = tw.div`
flex flex-col items-center w-full mt-[10px]
`;
