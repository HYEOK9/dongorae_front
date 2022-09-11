import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { useTheme } from "../../components/context/Theme";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { HashTagHolder } from "../../components/styled/Feed";

const FeedDetail = () => {
    const { themeColorset } = useTheme();
    
    return(<>
    <MainContainer>
        <FeedContainer style={{backgroundColor: themeColorset.bgColor}}>
            <MapContainer/>
            <ImgContainer>
                <ImgHolder style={{backgroundColor: themeColorset.baseColor}}>
                    <AddCircleIcon/>
                </ImgHolder>
            </ImgContainer>
            <ContentsContainer>
                <div>
                    <SpanContainer>
                        <TitleHolder>PLACENAME</TitleHolder>
                        <AddressHolder>address</AddressHolder>
                    </SpanContainer>
                    <HashTagContainer style={{color: themeColorset.subTextColor}}>
                        {Array.from({length: 5}, ()=> 0).map((e, idx)=>(
                        <HashTagHolder theme={themeColorset} key={idx}>#{idx}hastag{idx}</HashTagHolder>))}
                    </HashTagContainer> 
                    <TextHolder align="justify">
                    </TextHolder>
                </div>
            </ContentsContainer>
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
overflow-y-auto
`

const MapContainer = tw.div`
w-full h-[400px]
bg-[#1f1f1f]
`

const ImgContainer = tw.div`
w-full h-[200px] max-h-[25%]
p-[20px]
overflow-x-auto overflow-y-hidden
whitespace-nowrap
`

const ContentsContainer = tw.div`
w-full h-auto
flex gap-[10px]
p-[20px]
`
 
const ImgHolder = tw.div`
w-[200px] h-full 
mr-[10px]
inline-flex justify-center items-center
rounded-[15px]
`

const SpanContainer = tw.div`
w-full h-fit
`

const TitleHolder = tw.span`
text-[48px] font-bold
pr-[10px]
`

const AddressHolder = tw.span`
text-[20px] font-normal
`

const HashTagContainer = tw(SpanContainer)`
text-[16px] font-bold
flex gap-[6px]
mt-[5px] mb-[10px]
`

const TextHolder = tw.p`
my-[10px] mr-[15px]
leading-6 font-medium
`

export default FeedDetail;