import styled from "styled-components"

const HashTagHolder = styled.span`
background-color: ${(props) => props.theme.subTextColor};
color: ${(props) => props.theme.baseColor};
font-weight: bold;
padding: 6px 12px 4px 12px;
border-radius: 10px;
`

export {HashTagHolder}