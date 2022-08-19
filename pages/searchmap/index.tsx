import React, { useEffect, useState, useRef } from "react";
import tw from "tailwind-styled-components/";
import { RootState } from "../../store/index";
import { useSelector } from "react-redux";
declare global {
    interface Window {
        kakao: any;
    }
}

//NEXT_PUBLIC_KAKAO_JS_KEY=4a5963f87d30eacc276c05ea9e451ccc
const APPKEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const searchmap = () => {
    const container = useRef<HTMLDivElement>();
    const searchState = useSelector((state: RootState) => state.search);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APPKEY}&libraries=services,clusterer&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                const center = new kakao.maps.LatLng(
                    37.247949112203,
                    127.08086707223
                );
                const options = {
                    center,
                    level: 5,
                };
                const map = new kakao.maps.Map(
                    container.current as HTMLDivElement,
                    options
                );
                var ps = new kakao.maps.services.Places();
                function displayMarker(place: any) {
                    // 마커를 생성하고 지도에 표시합니다
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: new kakao.maps.LatLng(place.y, place.x),
                    });
                }
                // 키워드 검색 완료 시 호출되는 콜백함수 입니다
                const placesSearchCB = (data: any, status: any) => {
                    if (status === kakao.maps.services.Status.OK) {
                        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                        // LatLngBounds 객체에 좌표를 추가합니다
                        var bounds = new kakao.maps.LatLngBounds();

                        displayMarker(data[0]);
                        bounds.extend(
                            new kakao.maps.LatLng(data[0].y, data[0].x)
                        );

                        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                        map.setBounds(bounds);
                        map.setLevel(2);
                    }
                };
                // 키워드로 장소를 검색합니다
                searchState.keyword != "" &&
                    ps.keywordSearch(searchState.keyword, placesSearchCB);
            });
        };
    }, [container, searchState.keyword]);

    return (
        <>
            <MapWrapper>
                <Map id="container" ref={container} />;
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
`;

const Map = tw.div`
w-[600px]
h-[500px]
sm:w-[300px]
sm:h-[400px]
rounded-3xl
`;
