import React, { SetStateAction } from "react";
const removeMarker = (
    searchContent: { marker: any; customOverlay: any }[],
    setSearchContent: React.Dispatch<
        SetStateAction<{ marker: any; customOverlay: any }[]>
    >
) => {
    if (searchContent[0].marker && searchContent[0].customOverlay) {
        const temp = searchContent;
        for (let i = 0; i < temp.length; i++) {
            temp[i].marker.setMap(null);
            temp[i].customOverlay.setMap(null);
        }
        setSearchContent(temp);
    }
};

export default removeMarker;
