import React, { useEffect, useState, useRef } from "react";
import { text } from "stream/consumers";
import tw from "tailwind-styled-components/";
import { useTheme } from "../context/Theme";

interface propType {
    data: {
        hashTags: string,
        latitude: DoubleRange,
        longitude: DoubleRange,
        photos: Array<string>,
        place: string,
        text: string
    }
}

const Feed = (props:propType) => {
    const {themeColorset} = useTheme();

    const {data} = props;
    const hashTags = props.data?.hashTags.split(' #').map((tag)=> tag.startsWith('#') ? tag : `#${tag}`)

    console.log(hashTags);
    
    return (
    <FeedContainer style={{backgroundColor: themeColorset.bgColor}}>
        <ImgContainer src={data?.photos?.[0]}/>
        <ContentContainer>
            <HashTagContainer style={{color: themeColorset.subTextColor}}>
                {hashTags.map((tag)=><span>{tag}</span>)}
            </HashTagContainer>
        </ContentContainer>
    </FeedContainer>)
}


const FeedContainer = tw.div`
w-[calc(50%-20px)] max-w-[380px] 
h-fit 
m-[10px]
rounded-[20px] shadow-sm hover:shadow-[2px_2px_15px_5px_rgba(0,0,0,0.05)] ease-in duration-200
`

const ImgContainer = tw.img`
rounded-[20px_20px_0_0]
w-full h-fit max-h-[300px]
`

const ContentContainer = tw.div`
w-auto h-fit min-h-[200px]
p-[5px] m-0
shadow-none
`

const HashTagContainer = tw.div`
mx-[5px]
text-xs font-bold
flex gap-[4px]
`


export default Feed