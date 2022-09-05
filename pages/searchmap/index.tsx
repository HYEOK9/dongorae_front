import React, { useEffect, useState } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setKeyword } from "../../store/searchSlice";
//components
import Feed from "../../components/page/home/Feed";
//hooks
import useCurLocation from "../../util/hooks/useCurLocation";
import useInitMap from "../../util/hooks/map/useInitMap";
import useGetMapSize from "../../util/hooks/map/useGetMapSize";
import useKakaoMapSearch from "../../util/hooks/map/useKakaoMapSearch";
//functions
import displayMarker from "../../util/hooks/map/displayMarker";
import removeMarker from "../../util/hooks/map/removeMarker";
//types
import { MarkerType } from "../../types/map";
//style
import tw from "tailwind-styled-components";
import LoadingSVG from "/public/loading.svg";
import { useTheme } from "../../components/context/Theme";
//data
import { temp } from "../home/index";

const searchmap = () => {
    console.log("re-render");
    // 유저 위치 fetch
    const { location, locError } = useCurLocation();
    // 맵 초기화 , {지도, 지도를 띄울 dom의 ref}
    const { map, container } = useInitMap();
    // 현재 지도의 꼭짓점 좌표들
    const curMapSize = useGetMapSize(map);
    // 검색어 keywordState
    const searchState = useSelector((state: RootState) => state.searchState);
    // 키워드로 검색 , [결과, 에러 여부]
    const [result, error] = useKakaoMapSearch(searchState.keyword);
    // 검색 후 보여지는 피드들 List
    const [curFeeds, setCurFeeds] = useState<typeof temp>([]);
    // 검색 후 보여지는 피드들의 마커 List (마커 지우려면 필요)
    const [curFeedsMarkerArr, setCurFeedsMarkerArr] = useState<MarkerType[]>([
        {
            marker: null,
            customOverlay: null,
        },
    ]);
    //검색결과 존재여부
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const { themeColorset } = useTheme();
    const dispatch = useDispatch();

    const isInMap = (lat: number, long: number) => {
        return curMapSize.contain(new kakao.maps.LatLng(lat, long));
    };

    const searchHere = () => {
        setCurFeeds(
            temp.filter((feed) => isInMap(feed.latitude, feed.longitude))
        );
        dispatch(setKeyword(""));
    };

    useEffect(() => {
        // 처음 렌더할 때 결과 없음 문구 안보여주려고 map&& 넣음
        map && curFeeds.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
        removeMarker(curFeedsMarkerArr, setCurFeedsMarkerArr);
        curFeeds.forEach((feed: typeof temp[0]) => {
            displayMarker(
                {
                    x: feed.longitude,
                    y: feed.latitude,
                    place_name: feed.placeName,
                },
                map,
                setCurFeedsMarkerArr
            );
        });
    }, [curFeeds]);

    useEffect(() => {
        // 지도켜고 검색할 경우 첫번째 결과만 지도에 표시
        if (map === null || error) return;
        setCurFeeds(temp.filter((feed) => feed.longitude == result[0].x));
        // 검색된 장소 위치 기준으로 지도 범위 재설정
        const bounds = new kakao.maps.LatLngBounds();
        bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));
        map.setBounds(bounds);
        map.setLevel(5);
        console.log(result[0]);

        return () => {
            dispatch(setKeyword(""));
        };
    }, [map, result[0]]);

    return (
        <>
            <Container>
                <MapContainer>
                    {!location && locError && (
                        <>
                            <Loading>위치 정보를 가져오는 중입니다</Loading>
                            <LoadingSVG
                                fill="white"
                                className="absolute top-[55%] left-[49%] animate-spin z-50"
                                width={30}
                                height={30}
                            />
                        </>
                    )}
                    <Map id="container" ref={container} />
                    <SearchHereBtn
                        onClick={searchHere}
                        style={{ backgroundColor: themeColorset.bgColor }}
                    >
                        이 지역 검색
                    </SearchHereBtn>
                </MapContainer>
                <HomeContainer>
                    <FeedContainer>
                        {isEmpty ? (
                            <div style={{ marginTop: "50px" }}>
                                게시물이 없습니다.
                            </div>
                        ) : (
                            curFeeds.map((feed: any) => (
                                <Feed key={feed.id} data={feed} />
                            ))
                        )}
                    </FeedContainer>
                </HomeContainer>
            </Container>
        </>
    );
};

export default searchmap;

const Container = tw.div`
flex flex-col h-[90vh] overflow-y-auto
`;

const MapContainer = tw.div`
flex
relative
justify-center
items-center
w-screen
mt-[2vh]
`;

const Loading = tw.div`
flex
absolute
justify-center
items-center
flex-col
w-full
h-full
z-50
bg-black
opacity-40
text-white
`;

const Map = tw.div`
relative
w-full
h-[45vh]
`;

const SearchHereBtn = tw.div`
absolute top-[80%] px-4 py-3 font-semibold sm:text-xs sm:px-2 sm:py-1 rounded-2xl z-30 cursor-pointer shadow-2xl hover:scale-[0.98]
`;

const HomeContainer = tw.section`
flex justify-center w-screen py-[10px]
`;

const FeedContainer = tw.div`
w-[90vw] max-w-[1800px] flex flex-wrap justify-center
`;
