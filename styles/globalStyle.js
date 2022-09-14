import {createGlobalStyle, GlobalStyleComponent} from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
	${reset}
	body{
        background-color: ${({theme})=> theme.baseColor};
        color: ${({theme})=> theme.textColor}
	}
    svg{
        color: ${({theme})=> theme.pointColor}
    }
    div{
        border-color: ${({theme})=>theme.bgColor}
    }
    input, textarea{
        outline: 0 !important;
        &:hover,active,focus{
            border: none !important;
            outline: 0 !important;
        }
    }
`