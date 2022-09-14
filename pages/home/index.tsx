import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components/";
import axios from "../../util/axios";

import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import Feed from "../../components/page/home/Feed";
import Loading from "../../components/common/Loading";
import { useTheme } from "../../components/context/Theme";
import { RoundBtn } from "../../components/styled/Buttons";

import { dummyFeeds } from "../../util/dummyData";
import useStayLogin from "../../util/hooks/useStayLogin";
declare global {
    interface Window {}
}

const Home = () => {
    useStayLogin();
    const { themeColorset } = useTheme();
    const router = useRouter();

    const [curFeeds, setCurFeeds] = useState<Array<Object>>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function fetchAllFeed() {
        setIsLoading(true);
        axios({
            method: "get",
            url: "/api/feed/",
        })
            .then((res) => {
                setCurFeeds(res.data?.result.feedThumbnails);
            })
            .catch((e) => {
                // fetch fail시 임시로 dummyData 넣어줌
                // -> 추후 로딩에러 컴포넌트로 변경 예정
                if (curFeeds.length === 0) {
                    setCurFeeds(dummyFeeds.result.feedThumbnails);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchAllFeed();
    }, []);

    return (
        <>
            {isLoading && <Loading loadingMsg="피드를 가져오는 중입니다" />}
            <HomeContainer>
                <FeedContainer style={{ alignItems: "flex-end" }}>
                    {curFeeds.map((feed, idx) =>
                        idx % 3 === 0 ? (
                            <Feed key={feed.feedId} data={feed} />
                        ) : null
                    )}
                </FeedContainer>
                <FeedContainer style={{ alignItems: "center" }}>
                    {curFeeds.map((feed, idx) =>
                        idx % 3 === 1 ? (
                            <Feed key={feed.feedId} data={feed} />
                        ) : null
                    )}
                </FeedContainer>
                <FeedContainer style={{ alignItems: "flex-start" }}>
                    {curFeeds.map((feed, idx) =>
                        idx % 3 === 2 ? (
                            <Feed key={feed.feedId} data={feed} />
                        ) : null
                    )}
                </FeedContainer>
            </HomeContainer>
            <ButtonContainer>
                <RoundBtn
                    theme={themeColorset}
                    type="button"
                    onClick={() => router.push("/feed/add")}
                >
                    <AddIcon />
                </RoundBtn>
                <RoundBtn theme={themeColorset}>
                    <ArrowUpwardIcon />
                </RoundBtn>
            </ButtonContainer>
        </>
    );
};

const HomeContainer = tw.section`
flex justify-center 
w-screen h-[90vh]
py-[10px]
overflow-y-auto
`;

const FeedContainer = tw.div`
w-[30vw] max-w-[480px] flex flex-col flex-nowrap
`;

const ButtonContainer = tw.div`
fixed bottom-[0px] right-[0px]
flex gap-[10px]
w-fit h-fit
m-[20px]
z-[100]
`;

export default Home;
