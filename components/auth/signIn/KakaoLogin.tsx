import KakaoImg from "/public/logo_kakao.svg";
import Link from "next/link";
import { SocialBtn } from "../../buttons/SocialBtn";

const KakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;

const KakaoLogin = () => {
    return (
        <>
            <Link href={KakaoLoginUrl}>
                <SocialBtn>
                    <KakaoImg
                        width={40}
                        height={40}
                        className="absolute left-3"
                    />
                    카카오로 시작하기
                </SocialBtn>
            </Link>
        </>
    );
};

export default KakaoLogin;
