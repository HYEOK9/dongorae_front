import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components/";
import { useTheme } from "../../context/Theme";
import MyLocationIcon from '@mui/icons-material/MyLocation';
interface propType {
    data: {
        id: string,
        hashTags: string,
        latitude: DoubleRange,
        longitude: DoubleRange,
        photos: Array<string>,
        placeName: string,
        text: string
    }
}

const Feed = (props:propType) => {
    const {themeColorset} = useTheme();
    const router = useRouter();

    const {data} = props;
    const hashTags = data?.hashTags.split(' #').map((tag)=> tag.startsWith('#') ? tag : `#${tag}`)

    console.log(hashTags);
    
    return (
    <FeedContainer style={{backgroundColor: themeColorset.bgColor}} onClick={() => router.push(`feed/${data.id}`)}>
        <ImgContainer src={data?.photos?.[0]}/>
        <ContentContainer>
            <PlaceNameHolder>{data?.placeName} <MyLocationIcon style={{fontSize: '14px'}}/> </PlaceNameHolder>
            <HashTagContainer style={{color: themeColorset.subTextColor}}>
                {hashTags.map((tag)=><span>{tag}</span>)}
            </HashTagContainer>
            <TextHolder style={{color: themeColorset.pTextColor}}>{data?.text}</TextHolder>
        </ContentContainer>
    </FeedContainer>)
}


const FeedContainer = tw.div`
w-[100%] max-w-[380px] 
h-fit 
m-[10px]
rounded-[20px] shadow-sm hover:shadow-[2px_2px_15px_5px_rgba(0,0,0,0.05)] ease-in duration-200
`

const ImgContainer = tw.img`
rounded-[20px_20px_0_0]
w-full h-fit max-h-[300px]
`

const ContentContainer = tw.div`
w-auto h-fit min-h-[100px]
p-[15px_18px_18px_18px] m-0
shadow-none
`

const PlaceNameHolder = tw.div`
flex items-center gap-[3px]
text-xl font-bold
`

const HashTagContainer = tw.div`
mx-[2px]
text-xs font-bold
flex gap-[4px]
`

const TextHolder = tw.div`
pt-[5px]
text-[0.8rem] leading-5
`

export default Feed