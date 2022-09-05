import { useState, useEffect, useRef } from "react";
import { RootState } from "../../../store/index";
import { useSelector } from "react-redux";

declare global {
    interface Window {
        kakao: any;
    }
}

const APPKEY = "4a5963f87d30eacc276c05ea9e451ccc";
//카카오맵 불러오기
//return [지도,렌더링할 div의 ref]
const useInitMap = () => {
    const [map, setMap] = useState<any>(null);
    const container = useRef<HTMLDivElement>(null);
    //유저 현재 위치 불러옴
    const location = useSelector(
        (state: RootState) => state.curLocationState.location
    );
    //현재 위치를 불러오지 못했을 때
    const error = useSelector(
        (state: RootState) => state.curLocationState.error
    );

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APPKEY}&libraries=services,clusterer&autoload=false`;
        document.head.appendChild(script);
        script.onload = () => {
            kakao.maps.load(() => {
                const center = new kakao.maps.LatLng(
                    37.24291020655134,
                    127.08118995506915
                );
                const options = {
                    center,
                    level: 5,
                };
                const map =
                    container.current &&
                    new kakao.maps.Map(container.current, options);
                setMap(map);
            });
        };
    }, [container]);

    useEffect(() => {
        if (map === null) return;
        location &&
            map.setCenter(new kakao.maps.LatLng(location.lat, location.lng));
    }, [map, location, error]);

    return { map, container };
};

export default useInitMap;
