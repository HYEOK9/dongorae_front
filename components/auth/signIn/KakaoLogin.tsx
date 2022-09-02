import KakaoImg from "/public/logo_kakao.svg";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { BtnForSignIn } from "../../styled/Buttons";

const KakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;

const KakaoLogin = () => {
    return (
        <>
            <Link href={KakaoLoginUrl}>
                <SocialLogInBtn>
                    <KakaoImg
                        width={40}
                        height={40}
                        className="absolute left-3"
                    />
                    카카오로 시작하기
                </SocialLogInBtn>
            </Link>
        </>
    );
};

export default KakaoLogin;

const SocialLogInBtn = tw(BtnForSignIn)`
bg-white border-[1px] border-solid border-[#d5d5d5]
`;
