import { useEffect } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
//callback uri 백엔드 쪽으로 바꿀거라 추후 통째로 삭제 예정
//로그인 시 access code를 발급 받기 위한 callback uri
const KakaoCallBack = () => {
    const router = useRouter();
    useEffect(() => {
        //callback uri안에 access code 추출 후 로컬에 저장
        const AccessCode = new URL(window.location.href).searchParams.get(
            "code"
        );
        localStorage.setItem("loginToken", JSON.stringify(AccessCode));
        router.replace("/");
    }, []);
    return (
        <>
            <InfoText>잠시 후 어플리케이션으로 이동합니다...</InfoText>
        </>
    );
};

export default KakaoCallBack;

const InfoText = tw.p`
block m-4
`;
