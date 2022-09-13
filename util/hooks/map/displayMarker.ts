import React, { SetStateAction } from "react";
//배열에 있는 마커들 지도에 표시
//param : (장소,지도,마커)
const displayMarker = (
    place: any,
    map: any,
    setSearchContent: React.Dispatch<
        SetStateAction<{ marker: any; customOverlay: any }[]>
    >
) => {
    //고래 마크
    const markerImage = new kakao.maps.MarkerImage(
        "data:image/svg+xml,%3Csvg width='36px' height='36px' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' class='iconify iconify--twemoji' preserveAspectRatio='xMidYMid meet'%3E%3Cpath fill='%233B88C3' d='M36 7.001c-2 3-2-1-5 2c-3-2-3 3-6 0c.899 2.699 3.419 4.574 6.1 4.926c-.277 1.789.202 3.946-2.1 6.073c-2.008 1.857-3.023.312-8-2.999c-3-1.996-5-4-10-3C5.117 15.178 0 20 0 22s3 13.969 21 13.969c2 0 5.243-.664 8-2.969c5.955-4.978 5.882-15.349 4.58-19.456C35.36 12.417 36 9.394 36 7.001z'%3E%3C/path%3E%3Cpath fill='%2355ACEE' d='M30.214 31.812c.149-.165.289-.338.429-.511c1.879-2.351 2.902-5.349 3.355-8.29C31.999 28.008 30.992 33 20 33C9 33 5 20 0 22c0 2 3 13.969 21 13.969c2 0 5.243-.664 8-2.969a12.037 12.037 0 0 0 1.214-1.188z'%3E%3C/path%3E%3Ccircle fill='%23292F33' cx='6.5' cy='21.5' r='1.5'%3E%3C/circle%3E%3C/svg%3E",
        new kakao.maps.Size(50, 50),
        { offset: new kakao.maps.Point(30, 70) }
    );
    // 마커를 생성하고 지도에 표시
    const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
    });

    //검색했을 때 위에 뜨는 커스텀 오버레이
    //테일윈드만 먹음...
    const content =
        '<div class="flex flex-col items-center w-[150px] h-[40px] mb-[70px] border-solid border-[1px] border-[#5772F5] bg-[#f5f7ff] rounded-xl shadow-2xl">' +
        '<div class="flex justify-center items-center">' +
        `    <span class="flex justify-center items-center mt-[14px] font-semibold text-[13px] text-[#5772F5]">${
            place.place_name.length <= 11
                ? place.place_name
                : place.place_name.slice(0, 10) + "..."
        }</span>` +
        "</div>" +
        // `<div class="flex justify-center items-center w-3/5 h-[20px] mt-[15px] rounded-lg border-[#5772F5] border-[0.5px] border-solid font-normal text-black text-xs bg-[#f5f7ff]">#${"n"}개의 게시물</div>` +
        "</div>";

    //커스텀 오버레이 띄우기
    const customOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(place.y, place.x),
        content,
        yAnchor: 1,
    });
    marker.setMap(map);
    customOverlay.setMap(map);
    setSearchContent((prev) => [...prev, { marker, customOverlay }]);
};

export default displayMarker;
