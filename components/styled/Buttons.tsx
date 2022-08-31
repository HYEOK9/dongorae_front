import styled from "styled-components";
import tw from "tailwind-styled-components";

export const SocialBtn = tw.button`
flex justify-center items-center relative w-4/5 h-[60px] bg-white border-[1px] border-solid border-[#d5d5d5] rounded-2xl mt-2 font-medium cursor-pointer
`;

export const RoundBtn = styled.button`
width: ${(props)=> props.width || '60px'};
height: ${(props)=> props.height || '60px'};
border-radius: ${(props)=> props.borderRadius || '30px'};
background-color: ${(props)=> props.theme.bgColor || 'white'};
box-shadow: 4px 4px 8px 2px rgba(0,0,0,0.1);
:hover{
    background-color: ${(props)=> props.theme.pointColor};
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
    transition-duration: 130ms;
    >svg{
        color: ${(props)=> props.theme.bgColor};
    }
}
`