import React, { useEffect, useState } from "react";
import useInitMap from "../../util/hooks/kakaoMap/useInitMap";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import tw from "tailwind-styled-components/";

const searchmap = () => {
    //검색어 keywordState
    const searchState = useSelector((state: RootState) => state.search);
    //지도와 지도를 띄울 container ref를 리턴
    const { map, container } = useInitMap();
    const [searchContent, setSearchContent] = useState<{
        marker: any;
        customOverlay: any;
    } | null>(null);

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

        // 지도 시점 변화 완료 이벤트를 등록한다
        kakao.maps.event.addListener(map, "idle", checkMap);

        return () => {
            kakao.maps.event.removeListener(map, "idle", checkMap);
        };
    }, [map]);

    useEffect(() => {
        if (map === null) return;

        const ps = new kakao.maps.services.Places();

        //마커에 있는 고래
        const markerImage = new kakao.maps.MarkerImage(
            "data:image/svg+xml,%3Csvg width='36px' height='36px' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' class='iconify iconify--twemoji' preserveAspectRatio='xMidYMid meet'%3E%3Cpath fill='%233B88C3' d='M36 7.001c-2 3-2-1-5 2c-3-2-3 3-6 0c.899 2.699 3.419 4.574 6.1 4.926c-.277 1.789.202 3.946-2.1 6.073c-2.008 1.857-3.023.312-8-2.999c-3-1.996-5-4-10-3C5.117 15.178 0 20 0 22s3 13.969 21 13.969c2 0 5.243-.664 8-2.969c5.955-4.978 5.882-15.349 4.58-19.456C35.36 12.417 36 9.394 36 7.001z'%3E%3C/path%3E%3Cpath fill='%2355ACEE' d='M30.214 31.812c.149-.165.289-.338.429-.511c1.879-2.351 2.902-5.349 3.355-8.29C31.999 28.008 30.992 33 20 33C9 33 5 20 0 22c0 2 3 13.969 21 13.969c2 0 5.243-.664 8-2.969a12.037 12.037 0 0 0 1.214-1.188z'%3E%3C/path%3E%3Ccircle fill='%23292F33' cx='6.5' cy='21.5' r='1.5'%3E%3C/circle%3E%3C/svg%3E",
            new kakao.maps.Size(60, 60),
            { offset: new kakao.maps.Point(30, 60) }
        );

        const removeMarker = () => {
            if (searchContent) {
                searchContent.marker.setMap(null);
                searchContent.customOverlay.setMap(null);
            }
            setSearchContent(null);
        };
        //파라미터에 함수 넣으면 고래마크+위에 링크뜸
        const displayMarker = (place: any, map: any) => {
            removeMarker();
            // 마커를 생성하고 지도에 표시합니다
            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(place.y, place.x),
                image: markerImage,
            });

            //검색했을 때 위에 뜨는 커스텀 오버레이
            const content =
                '<div class="flex relative items-center w-[150px] h-[40px] mb-[60px] border-solid border-[0.5px] border-[#5772F5] bg-[#f5f7ff] rounded-xl shadow-2xl">' +
                '<a class="flex items-center w-full h-full" href="/signin">' +
                `    <span class="flex justify-center w-[70%] mt-1 font-semibold text-sm text-[#5772F5]">${
                    place.place_name.split(" ")[0].length <= 7
                        ? place.place_name.split(" ")[0]
                        : place.place_name.slice(0, 6) + "..."
                }</span>` +
                '<div class="flex justify-center items-center w-[30%] h-[40px] bg-[#5772F5] z-50 rounded-r-xl"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch" focusable="false" aria-hidden="true" fill="#fff" width="20px" height="20px" viewBox="0 0 24 24" data-testid="ArrowForwardIosIcon"><path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path></svg></div>' +
                "</a>" +
                "</div>";

            //커스텀 오버레이 띄우기
            const customOverlay = new kakao.maps.CustomOverlay({
                position: new kakao.maps.LatLng(place.y, place.x),
                content,
                yAnchor: 1,
            });

            marker.setMap(map);
            customOverlay.setMap(map);
            setSearchContent({ marker, customOverlay });
        };

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        const placesSearchCB = (data: any, status: any) => {
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다

                displayMarker(data[0], map);
                const bounds = new kakao.maps.LatLngBounds();

                bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
                map.setLevel(3);
                console.log(data, data[0].place_name);
            }
        };
        // 키워드로 장소를 검색합니다
        searchState.keyword != "" &&
            ps.keywordSearch(searchState.keyword, placesSearchCB);
    }, [map, searchState.keyword]);

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
