import { useState, useEffect } from "react";
const useGetMapSize = (map: any) => {
    const [curMapSize, setCurMapSize] = useState<any>();
    useEffect(() => {
        // 맵 움직이거나 확대할 때 마다 맨 좌측하단, 맨 우측상단 좌표 check
        // 지도 범위 내에 피드 보이게 하기 위함
        if (map === null) return;
        const SW = map.getBounds().getSouthWest();
        const NE = map.getBounds().getNorthEast();
        setCurMapSize(new kakao.maps.LatLngBounds(SW, NE));
        let timer: any;
        const checkMap = () => {
            clearTimeout(timer);
            const SW = map.getBounds().getSouthWest();
            const NE = map.getBounds().getNorthEast();
            timer = setTimeout(() => {
                setCurMapSize(new kakao.maps.LatLngBounds(SW, NE));
            }, 100);
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
