import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components/";
import { useTheme } from "../../context/Theme";
import MyLocationIcon from "@mui/icons-material/MyLocation";
interface propType {
    data: {
        "feedId": number,
        "writerId": number,
        "title": string,
        "text": string,
        "writer": string,
        "mainPhoto": Array<string>,
        "sensedata": {
            "id": number,
            "auditory": number,
            "visual": number,
            "vestibular": number,
            "tactile": number,
            "proprioceptive": number,
            "oral": number
        }
    };
}

const Feed = (props: propType) => {
    const { themeColorset } = useTheme();
    const router = useRouter();

    const { data } = props;
    const hashTags = data?.hashTags?.map((tag: string) =>
        tag.startsWith("#") ? tag : `#${tag}`
    ) || [];

    console.log(data);

    return (
        <FeedContainer
            style={{ backgroundColor: themeColorset.bgColor }}
            onClick={() => router.push(`feed/${data.feedId}`)}
        >
            <ImgContainer src={data?.mainPhoto} />
            <ContentContainer>
                <PlaceNameHolder>
                    {data?.title}{" "}
                    <MyLocationIcon style={{ fontSize: "14px" }} />{" "}
                </PlaceNameHolder>
                <HashTagContainer style={{ color: themeColorset.subTextColor }}>
                    {hashTags.map((tag: string) => (
                        <span>{tag}</span>
                    ))}
                </HashTagContainer>
                <TextHolder style={{ color: themeColorset.pTextColor }}>
                    {data?.text}
                </TextHolder>
            </ContentContainer>
        </FeedContainer>
    );
};

const FeedContainer = tw.div`
w-[100%] max-w-[400px] 
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
