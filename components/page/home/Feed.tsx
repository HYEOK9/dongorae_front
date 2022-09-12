import React, { useEffect, useState, useRef } from "react";
import tw from "tailwind-styled-components/";
import { useTheme } from "../../context/Theme";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { IFeedThumbnail } from "../../../types/feed";
import { useRouter } from "next/router";

interface PropType {
    data: IFeedThumbnail;
}

const Feed = (props: PropType) => {
    const { themeColorset } = useTheme();
    const router = useRouter();

    console.log(props);
    const hashTags = props.hashTags?.split(" #")
        .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));

    return (
        <FeedContainer onClick={() => router.push(`/feed/${props.data.feedId}`)} style={{ backgroundColor: themeColorset.bgColor }}>
            <ImgContainer src={props?.data?.mainPhoto} />
            <ContentContainer>
                <PlaceNameHolder>
                    {props?.data?.placeName}{" "}
                    <MyLocationIcon style={{ fontSize: "14px" }} />{" "}
                </PlaceNameHolder>
                <TitleHolder>
                    {props?.data?.title}
                </TitleHolder>
                <HashTagContainer style={{ color: themeColorset.subTextColor }}>
                    {hashTags?.map((tag) => (
                        <span>{tag}</span>
                    ))}
                </HashTagContainer>
                <TextHolder style={{ color: themeColorset.pTextColor }}>
                    {props?.data?.text}
                </TextHolder>
            </ContentContainer>
        </FeedContainer>
    );
};

const FeedContainer = tw.div`
w-[calc(100%-20px)] max-w-[380px] 
h-fit 
m-[10px]
rounded-[20px] shadow-sm hover:shadow-[2px_2px_15px_5px_rgba(0,0,0,0.05)] ease-in duration-200
`;

const ImgContainer = tw.img`
rounded-[20px_20px_0_0]
w-full h-fit max-h-[300px]
`;

const ContentContainer = tw.div`
w-auto h-fit min-h-[100px]
p-[15px_18px_18px_18px] m-0
shadow-none
`;

const PlaceNameHolder = tw.div`
flex items-center gap-[3px]
text-xl font-bold
`;

const TitleHolder = tw.div`
text-l font-bold
mt-[10px]
`;

const HashTagContainer = tw.div`
mx-[2px]
text-xs font-bold
flex gap-[4px]
`;

const TextHolder = tw.div`
pt-[5px]
text-[0.8rem] leading-5
`;

export default Feed;
