import styled from "styled-components";
import tw from "tailwind-styled-components";

export const BasicInput = styled.input`
    width: ${(props)=> props.width || 'auto'};
    padding: 10px 20px;
    background-color: ${(props) => props.theme.baseColor || "white"};
    border-radius: 20px;
`