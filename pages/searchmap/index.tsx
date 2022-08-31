import React, { useEffect, useState } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setKeyword } from "../../store/searchSlice";
//hooks
import useInitMap from "../../util/hooks/map/useInitMap";
import useKakaoMapSearch from "../../util/hooks/map/useKakaoMapSearch";
//functions
import displayMarker from "../../util/hooks/map/displayMarker";
import removeMarker from "../../util/hooks/map/removeMarker";
//types
import { MarkerType } from "../../types/map";
//style
import tw from "tailwind-styled-components/";
import LoadingSVG from "/public/loading.svg";
import useCurLocation from "../../util/hooks/useCurLocation";
const searchmap = () => {
    const location = useCurLocation();
    // 맵 초기화
    // return [지도, 지도를 띄울 container ref, searchService]
    const { map, container } = useInitMap();
    // 검색어 keywordState
    const searchState = useSelector((state: RootState) => state.searchState);
    // 키워드로 검색
    // return [결과, 에러 여부]
    const [result, error] = useKakaoMapSearch(searchState.keyword);
    // 유저가 현재 검색한 장소 하나만 관리하는 state
    const [searchContent, setSearchContent] = useState<MarkerType[]>([
        {
            marker: null,
            customOverlay: null,
        },
    ]);
    const dispatch = useDispatch();

    useEffect(() => {
        // 맵 움직이거나 확대할 때 마다 맨 좌측하단, 맨 우측상단 좌표 check
        // 지도 범위 내에 피드 보이게 하기 위함
        if (map === null) return;
        const checkMap = () => {
            const SW = map.getBounds().getSouthWest();
            const NE = map.getBounds().getNorthEast();
            const curSize = new kakao.maps.LatLngBounds(SW, NE);
            const level = map.getLevel();
            console.log(level, curSize);
        };
        // 지도 시점 변화 완료 이벤트 등록
        kakao.maps.event.addListener(map, "bounds_changed", checkMap);

        return () => {
            kakao.maps.event.removeListener(map, "bounds_changed", checkMap);
        };
    }, [map]);

    useEffect(() => {
        // 지도켜고 검색할 경우 첫번째 결과만 지도에 표시
        if (map === null || error) return;

        // 기존 마커 삭제
        removeMarker(searchContent, setSearchContent);
        // 검색된 장소 마커 추가
        displayMarker(result[0], map, setSearchContent);
        // 검색된 장소 위치 기준으로 지도 범위 재설정
        const bounds = new kakao.maps.LatLngBounds();
        bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));
        map.setBounds(bounds);
        map.setLevel(3);
        return () => {
            dispatch(setKeyword(""));
        };
    }, [result[0], map]);

    return (
        <>
            <MapWrapper>
                {!location && (
                    <>
                        <Loading>위치 정보를 가져오는 중입니다</Loading>
                        <LoadingSVG
                            fill="white"
                            className="absolute top-[52%] left-[49%] animate-spin z-50"
                            width={30}
                            height={30}
                        />
                    </>
                )}
                <Map id="container" ref={container} props={location} />
            </MapWrapper>
        </>
    );
};

export default searchmap;

const MapWrapper = tw.div`
flex
relative
justify-center
items-center
w-screen
h-[90vh]
mt-[10vh]
`;

const Loading = tw.div`
flex
absolute
justify-center
items-center
flex-col
w-full
h-[90vh]
z-50
bg-black
opacity-40
text-bold
text-white
`;

const Map = tw.div`
w-[95%]
h-[95%]
rounded-2xl
`;
