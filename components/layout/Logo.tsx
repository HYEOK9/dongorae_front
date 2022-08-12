import tw from "tailwind-styled-components";
import { useRouter } from "next/router";

const Logo = () => {
    const router = useRouter();

    return (
        <>
            <LogoConatiner>
                <LogoArea
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    <LogoWrap>Logo</LogoWrap>
                </LogoArea>
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
hover:scale-105
text-4xl
`;
