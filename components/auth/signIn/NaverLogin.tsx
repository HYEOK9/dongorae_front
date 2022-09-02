import React from "react";
import Link from "next/link";
import NaverSVG from "/public/logo_naver.svg";
import tw from "tailwind-styled-components/dist/tailwind";
import { BtnForSignIn } from "../../styled/Buttons";

const NaverLoginURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=authorize`;

const NaverLogin = () => {
    return (
        <>
            <Link href={NaverLoginURL}>
                <SocialLogInBtn>
                    <NaverSVG
                        width={32}
                        height={32}
                        style={{
                            position: "absolute",
                            top: "13px",
                            left: "15px",
                        }}
                    />
                    네이버로 시작하기
                </SocialLogInBtn>
            </Link>
        </>
    );
};

export default NaverLogin;

const SocialLogInBtn = tw(BtnForSignIn)`
bg-white border-[1px] border-solid border-[#d5d5d5]
`;
