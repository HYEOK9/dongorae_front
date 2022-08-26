import React, { useEffect, useState } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import useInitMap from "../../util/hooks/kakaoMap/useInitMap";
import useKakaoMapSearch from "../../util/hooks/kakaoMap/kaokaoMapSearch";
import displayMarker from "../../util/hooks/kakaoMap/displayMarker";
import tw from "tailwind-styled-components/";
import removeMarker from "../../util/hooks/kakaoMap/removeMarker";

const searchmap = () => {
    //지도, 지도를 띄울 container ref, searchService 리턴
    const { map, container, ps } = useInitMap();
    //검색어 keywordState
    const searchState = useSelector((state: RootState) => state.search);

    //키워드로 검색. return [결과, 에러 여부]
    const [result, error] = useKakaoMapSearch(
        searchState.keyword,
        //카카오맵 searchService, 위에 ininMap할 때 받아옴
        ps
    );
    const [searchContent, setSearchContent] = useState<
        {
            marker: any;
            customOverlay: any;
        }[]
    >([{ marker: null, customOverlay: null }]);

    useEffect(() => {
        if (map === null) return;
        //맵 움직이거나 확대할 때 마다 맨 좌측하단, 맨 우측상단 좌표 check(지도 범위 내에 피드 보이게 하려고)
        const checkMap = () => {
            const leftLat = map.getBounds().getSouthWest().getLat();
            const leftLng = map.getBounds().getSouthWest().getLng();
            const RightLat = map.getBounds().getNorthEast().getLat();
            const RightLng = map.getBounds().getNorthEast().getLng();
            console.log(leftLat, leftLng, RightLat, RightLng);
        };

        // 지도 시점 변화 완료 이벤트 등록
        kakao.maps.event.addListener(map, "idle", checkMap);

        return () => {
            kakao.maps.event.removeListener(map, "idle", checkMap);
        };
    }, [map]);

    //지도켜고 검색할 경우 첫번째 결과만 지도에 표시
    useEffect(() => {
        if (map === null || error) return;
        //기존에 있던 고래마커 삭제
        removeMarker(searchContent, setSearchContent);
        //검색된 장소에 고래마커 추가
        displayMarker(result[0], map, setSearchContent);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        const bounds = new kakao.maps.LatLngBounds();
        bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));
        map.setBounds(bounds);
        map.setLevel(3);
    }, [searchState.keyword, result[0], map]);

    return (
        <>
            <MapWrapper>
                <Map id="container" ref={container} />
            </MapWrapper>
        </>
    );
};

export default searchmap;

const MapWrapper = tw.div`
flex
justify-center
items-center
w-screen
h-screen
mt-[10vh]
`;

const Map = tw.div`
w-[95%]
h-[95%]
rounded-2xl
`;
