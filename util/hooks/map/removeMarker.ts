import React, { SetStateAction } from "react";

//배열에 있는 마커들 삭제
const removeMarker = (
    searchContent: { marker: any; customOverlay: any }[],
    setSearchContent: React.Dispatch<
        SetStateAction<{ marker: any; customOverlay: any }[]>
    >
) => {
    if (searchContent.length <= 1) return;
    const temp = searchContent;
    for (let i = 1; i < temp.length; i++) {
        temp[i].marker.setMap(null);
        temp[i].customOverlay.setMap(null);
    }
    setSearchContent(temp);
};

export default removeMarker;
