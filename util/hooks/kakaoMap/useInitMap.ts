import { useEffect, useState, useRef } from "react";
import { RootState } from "../../../store/index";
import { useSelector } from "react-redux";

declare global {
    interface Window {
        kakao: any;
    }
}

const APPKEY = "4a5963f87d30eacc276c05ea9e451ccc";
//const APPKEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

//지도, render할 div의 ref 반환
const useInitMap = () => {
    const [map, setMap] = useState<any>(null);
    const container = useRef<HTMLDivElement>();

    const [ps, setPs] = useState<any>(null);
    //유저 현재 위치 불러옴
    const location = useSelector(
        (state: RootState) => state.curLocation.location
    );
    //유저위치 fetch에 대한 에러여부
    const error = useSelector((state: RootState) => state.curLocation.err);

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
                const map = new kakao.maps.Map(
                    container.current as HTMLDivElement,
                    options
                );
                setMap(map);
                setPs(new kakao.maps.services.Places());
            });
        };
    }, [container]);

    return { map, container, ps };
};

export default useInitMap;
