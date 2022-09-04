import { useState, useEffect } from "react";
const useGetMapSize = (map: any) => {
    const [curMapSize, setCurMapSize] = useState<any>();

    useEffect(() => {
        // 맵 움직이거나 확대할 때 마다 맨 좌측하단, 맨 우측상단 좌표 check
        // 지도 범위 내에 피드 보이게 하기 위함
        if (map === null) return;
        let SW = map.getBounds().getSouthWest();
        let NE = map.getBounds().getNorthEast();
        setCurMapSize(new kakao.maps.LatLngBounds(SW, NE));
        const checkMap = () => {
            SW = map.getBounds().getSouthWest();
            NE = map.getBounds().getNorthEast();
            setCurMapSize(new kakao.maps.LatLngBounds(SW, NE));
        };
        // 지도 시점 변화 완료 이벤트 등록
        kakao.maps.event.addListener(map, "bounds_changed", checkMap);
        return () => {
            kakao.maps.event.removeListener(map, "bounds_changed", checkMap);
        };
    }, [map]);

    return curMapSize;
};

export default useGetMapSize;
