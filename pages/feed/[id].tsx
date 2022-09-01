import React from 'react'
import tw from 'tailwind-styled-components';
import { useTheme } from '../../components/context/Theme';

interface propType {
    id: string
}

const FeedDetail = (props: propType) => {
    const {themeColorset} = useTheme();
    
    return(<>
    <MainContainer>
        <FeedContainer  style={{backgroundColor: themeColorset.bgColor}}>

        </FeedContainer>
    </MainContainer>
        </>)
}

const MainContainer = tw.div`
w-full h-full
flex justify-center items-center
`
const FeedContainer = tw.div`
w-[80%] max-w-[1600px]
h-[96%]
rounded-[20px]
`

export default FeedDetail;