import { useState, useEffect, useRef } from "react";
import { RootState } from "../../../store/index";
import { useSelector } from "react-redux";

declare global {
    interface Window {
        kakao: any;
    }
}

const APPKEY = "4a5963f87d30eacc276c05ea9e451ccc";
const REST_APIKEY = "c94753752157bc9fce4e45778dbd0dd7";
//카카오맵 불러오기
//return [지도,렌더링할 div의 ref]
const useInitMap = () => {
    const [map, setMap] = useState<any>(null);
    const container = useRef<HTMLDivElement>(null);
    //유저 현재 위치 불러옴
    const location = useSelector(
        (state: RootState) => state.curLocationState.location
    );
    const error = useSelector(
        (state: RootState) => state.curLocationState.error
    );
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APPKEY}&libraries=services,clusterer&autoload=false`;
        document.head.appendChild(script);
        script.onload = () => {
            kakao.maps.load(() => {
                //center = 유저위치 ? 유저위치 : 경희대
                const center =
                    location && !error
                        ? new kakao.maps.LatLng(location.lat, location.lng)
                        : new kakao.maps.LatLng(
                              37.247949112203,
                              127.08086707223
                          );

                const options = {
                    center,
                    level: 5,
                };
                const map =
                    container &&
                    new kakao.maps.Map(
                        container.current as HTMLDivElement,
                        options
                    );
                setMap(map);
            });
        };
        return () => {
            setMap(null);
        };
    }, [container, location, error]);

    return { map, container };
};

export default useInitMap;
