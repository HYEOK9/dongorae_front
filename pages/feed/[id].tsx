import { useRouter } from 'next/router';
import React from 'react'
import tw from 'tailwind-styled-components';
import { useTheme } from '../../components/context/Theme';

const FeedDetail = () => {
    const { themeColorset } = useTheme();
    const route = useRouter();
    const { query } = route;

    /* 추후 query의 id값을 가지고 fetch */

    return(<>
    <MainContainer>
        <FeedContainer style={{backgroundColor: themeColorset.bgColor}}>
            <MapContainer/>
            <ImgContainer>
                {Array.from({length: 5}, ()=> 0).map((e, idx)=>(<ImgHolder key={idx}/>))}
            </ImgContainer>
            <SpanContainer>
                <TitleHolder>PLACENAME</TitleHolder>
                <AddressHolder>address</AddressHolder>
            </SpanContainer>
            <HashTagContainer style={{color: themeColorset.subTextColor}}>
                {Array.from({length: 5}, ()=> 0).map((e, idx)=>(<span key={idx}>#{idx}hastag{idx}</span>))}
            </HashTagContainer>
            
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

const MapContainer = tw.div`
w-full h-[20%] max-h-[400px]
bg-[#1f1f1f]
`

const ImgContainer = tw.div`
w-full h-[15%]
p-[20px]
overflow-x-auto whitespace-nowrap
`
 
const ImgHolder = tw.div`
w-[200px] h-full 
mr-[10px] inline-block
bg-[#1f1f1f] rounded-[15px]
`

const SpanContainer = tw.div`
w-full h-fit
px-[20px] py-[10px]
`

const TitleHolder = tw.span`
p-[10px]
text-[48px] font-bold
`

const AddressHolder = tw.span`
text-[20px] font-normal
`

const HashTagContainer = tw(SpanContainer)`
py-0 px-[30px]
text-[16px] font-bold
flex gap-[6px]
`

export default FeedDetail;