import React, { useEffect, useState } from "react";
//components
import Feed from "../../../components/page/home/Feed";
//types
import { IFeedThumbnail } from "../../../types/feed";
//style
import tw from "tailwind-styled-components";
import LoadingSVG from "/public/loading.svg";
import { useTheme } from "../../../components/context/Theme";

interface propType {
    curFeeds: any[];
    filterOption: any;
    user: any;
    searchLoading: boolean;
    map: any;
}
const ShowFeeds = ({
    curFeeds,
    filterOption,
    user,
    searchLoading,
    map,
}: propType) => {
    //검색결과 존재여부
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const { themeColorset } = useTheme();

    useEffect(() => {
        if (map == null) return;

        if (filterOption === "전체" && curFeeds.length === 0) {
            setIsEmpty(true);
            return;
        }

        if (
            filterOption === "맞춤게시물" &&
            user &&
            curFeeds.filter(
                (feed) =>
                    feed.sensedata.auditory <= user.userSense.auditory &&
                    feed.sensedata.visual <= user.userSense.visual &&
                    feed.sensedata.vestibular <= user.userSense.vestibular &&
                    feed.sensedata.tactile <= user.userSense.tactile &&
                    feed.sensedata.proprioceptive <=
                        user.userSense.proprioceptive &&
                    feed.sensedata.oral <= user.userSense.oral
            ).length === 0
        ) {
            setIsEmpty(true);
            return;
        }
        setIsEmpty(false);
    }, [curFeeds, filterOption]);

    return (
        <HomeContainer>
            <FeedContainer>
                {searchLoading && (
                    <LoadingSVGwrap>
                        <LoadingSVG
                            width={50}
                            height={50}
                            fill={themeColorset.textColor}
                        />
                    </LoadingSVGwrap>
                )}
                {isEmpty ? (
                    <div style={{ marginTop: "50px" }}>게시물이 없습니다.</div>
                ) : filterOption === "전체" ? (
                    curFeeds.map((feed: any) => (
                        <Feed key={feed.feedId} data={feed} />
                    ))
                ) : filterOption === "맞춤게시물" && user ? (
                    curFeeds
                        .filter(
                            (feed) =>
                                feed.sensedata.auditory <=
                                    user.userSense.auditory &&
                                feed.sensedata.visual <=
                                    user.userSense.visual &&
                                feed.sensedata.vestibular <=
                                    user.userSense.vestibular &&
                                feed.sensedata.tactile <=
                                    user.userSense.tactile &&
                                feed.sensedata.proprioceptive <=
                                    user.userSense.proprioceptive &&
                                feed.sensedata.oral <= user.userSense.oral
                        )
                        .map((feed: any) => (
                            <Feed key={feed.feedId} data={feed} />
                        ))
                ) : null}
            </FeedContainer>
        </HomeContainer>
    );
};

export default ShowFeeds;

const HomeContainer = tw.section`
flex justify-center w-screen py-[10px]
`;

const FeedContainer = tw.div`
w-[90vw] max-w-[1800px] flex flex-wrap justify-center
`;

const LoadingSVGwrap = tw.div`
absolute top-[55%] left-[49%] animate-spin z-50
`;
