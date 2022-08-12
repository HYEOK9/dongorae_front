import { useEffect } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";

//callback uri 백엔드 쪽으로 바꿀거라 추후 통째로 삭제 예정
//로그인 시 access code를 발급 받기 위한 callback uri
const NaverCallBack = () => {
    const router = useRouter();

    useEffect(() => {
        const AccessCode = window.location.href.split("=")[1].split("&")[0];
        //callback uri안에 access code 추출 후 로컬에 저장
        localStorage.setItem("loginToken", JSON.stringify(AccessCode));
        router.replace("/");
    }, []);

    return (
        <>
            <InfoText>잠시 후 어플리케이션으로 이동합니다...</InfoText>
        </>
    );
};

export default NaverCallBack;

const InfoText = tw.p`
block m-4
`;
