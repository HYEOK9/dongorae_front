import tw from "tailwind-styled-components";
import Link from "next/link";

const Logo = () => {
    return (
        <>
            <LogoConatiner>
                <Link href="/">
                    <LogoArea>
                        <LogoWrap>Logo</LogoWrap>
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
`;
