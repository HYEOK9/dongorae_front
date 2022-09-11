import React, { useEffect, useState } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setKeyword } from "../../store/searchSlice";
import { setFilterOption, setSenseData } from "../../store/filterSlice";
//components
import Feed from "../../components/page/home/Feed";
import SearchFiler from "../../components/common/filtering/searchFilter";
//hooks
import useCurLocation from "../../util/hooks/useCurLocation";
import useInitMap from "../../util/hooks/map/useInitMap";
import useGetMapSize from "../../util/hooks/map/useGetMapSize";
import useKakaoMapSearch from "../../util/hooks/map/useKakaoMapSearch";
//functions
import { boundarySearch, keywordSearch } from "../../util/map";
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
    const keyword = useSelector(
        (state: RootState) => state.searchState.keyword
    );
    // 키워드로 검색 , [결과, 에러 여부]
    //const { result, searchError } = useKakaoMapSearch(keyword);
    // 검색 후 보여지는 피드들 List
    const [curFeeds, setCurFeeds] = useState<typeof temp>([]);
    // 검색 후 보여지는 피드들의 마커 List (마커 지우려면 필요)
    const [curPlacesMarkers, setCurPlacesMarkers] = useState<MarkerType[]>([
        {
            marker: null,
            customOverlay: null,
        },
    ]);
    //검색 필터 옵션 : "전체" | "맞춤게시물" | "필터"
    const filterOption = useSelector(
        (state: RootState) => state.filterState.option
    );
    ///검색 필터의 senseData 값
    const senseData = useSelector(
        (state: RootState) => state.filterState.senseData
    );
    //검색결과 존재여부
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const { themeColorset } = useTheme();
    const dispatch = useDispatch();

    const isInMap = (lat: number, long: number) => {
        return curMapSize.contain(new kakao.maps.LatLng(lat, long));
    };

    const searchHere = async () => {
        dispatch(setSenseData(null));
        dispatch(setFilterOption("전체"));
        const data = await boundarySearch(
            curMapSize.oa,
            curMapSize.pa,
            curMapSize.ha,
            curMapSize.qa
        );
        console.log(data.result);
        // setCurFeeds(
        //     temp.filter((feed) => isInMap(feed.latitude, feed.longitude))
        // );
        dispatch(setKeyword(""));
    };

    useEffect(() => {
        if (map === null) return;
        switch (filterOption) {
            case "전체":
                dispatch(setSenseData(null));
                break;
            case "맞춤게시물":
                dispatch(setSenseData(null));
                break;
            case "필터":
                break;
        }
    }, [filterOption]);

    useEffect(() => {
        // 처음 렌더할 때 결과 없음 문구 안보여주려고 map&& 넣음
        map && curFeeds.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
        const places = Array.from(
            new Set(
                curFeeds.map((feed) =>
                    JSON.stringify({
                        x: feed.longitude,
                        y: feed.latitude,
                        place_name: feed.placeName,
                    })
                )
            )
        ).map((feed) => JSON.parse(feed));
        removeMarker(curPlacesMarkers, setCurPlacesMarkers);
        places.forEach((place) => {
            displayMarker(place, map, setCurPlacesMarkers);
        });
    }, [curFeeds]);

    useEffect(() => {
        if (map === null || keyword.trim() == "") return;
        (async () => {
            const data = await keywordSearch(keyword);
            console.log(data.result);
        })();
    }, [map, keyword]);

    // useEffect(() => {
    //     // 지도켜고 검색할 경우 첫번째 결과만 지도에 표시
    //     if (map === null || searchError) return;
    //     dispatch(setFilterOption("전체"));
    //     setCurFeeds(temp.filter((feed) => feed.longitude == result[0].x));
    //     // 검색된 장소 위치 기준으로 지도 범위 재설정
    //     const bounds = new kakao.maps.LatLngBounds();
    //     bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));
    //     map.setBounds(bounds);
    //     map.setLevel(5);
    //     console.log(result[0]);

    //     return () => {
    //         dispatch(setKeyword(""));
    //     };
    // }, [map, result[0]]);

    return (
        <>
            <Container>
                <MapContainer>
                    {!location && locError && (
                        <>
                            <Loading>위치 정보를 가져오는 중입니다</Loading>
                            <LoadingSVGwrap>
                                <LoadingSVG width={30} height={30} />
                            </LoadingSVGwrap>
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
                {/*filtering*/}
                <SearchFiler />
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
flex relative justify-center items-center w-screen mt-[2vh]
`;

const Loading = tw.div`
flex absolute justify-center items-center flex-col w-full h-full z-50 bg-black opacity-40 text-white
`;

const LoadingSVGwrap = tw.div`
absolute top-[55%] left-[49%] animate-spin z-50
`;

const Map = tw.div`
relative w-full h-[45vh]
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
