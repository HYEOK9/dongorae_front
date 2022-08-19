import React from "react";
import Link from "next/link";
import NaverSVG from "/public/logo_naver.svg";
import { SocialBtn } from "../../buttons/SocialBtn";

const NaverLoginURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=authorize`;

const NaverLogin = () => {
    return (
        <>
            <SocialBtn>
                <Link href={NaverLoginURL}>
                    <a>
                        <NaverSVG
                            width={32}
                            height={32}
                            style={{
                                position: "absolute",
                                left: "15px",
                            }}
                        />
                        네이버로 시작하기
                    </a>
                </Link>
            </SocialBtn>
        </>
    );
};

export default NaverLogin;
