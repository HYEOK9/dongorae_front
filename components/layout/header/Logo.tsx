import tw from "tailwind-styled-components";
import Link from "next/link";
import Head from "next/head";
import { useTheme } from "../../context/Theme";

const Logo = () => {
    const { themeColorset } = useTheme();
    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css?family=Jua:400"
                    rel="stylesheet"
                />
            </Head>
            <LogoConatiner>
                <Link href="/home">
                    <LogoArea>
                        <LogoWrap style={{ color: themeColorset.pointColor }}>
                            동고래
                        </LogoWrap>
                    </LogoArea>
                </Link>
            </LogoConatiner>
        </>
    );
};

export default Logo;

const LogoConatiner = tw.div`
flex
justify-start
items-center
w-1/4
h-full
`;

const LogoArea = tw.div`
flex
justify-center
items-center
w-1/2
`;

const LogoWrap = tw.div`
cursor-pointer
text-4xl
font-jua
`;
