import styled from "styled-components";
import tw from "tailwind-styled-components";

export const BasicInput = styled.input`
    width: ${(props)=> props.width || 'auto'};
    padding: 16px 20px;
    background-color: ${(props) => props.theme.baseColor || "white"};
    border-radius: 20px;
`

export const BasicTextarea = styled.textarea`
    width: ${(props)=> props.width || 'auto'};
    height: ${(props)=> props.width || '400px'};
    padding: 16px 20px;
    background-color: ${(props) => props.theme.baseColor || "white"};
    border-radius: 20px;
`
