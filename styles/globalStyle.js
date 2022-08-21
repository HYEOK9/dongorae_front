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
`