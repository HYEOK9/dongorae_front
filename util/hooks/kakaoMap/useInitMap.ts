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

const useInitMap = () => {
    //카카오map
    const [map, setMap] = useState<any>(null);
    //map render하는 div의 ref
    const container = useRef<HTMLDivElement>();

    //유저 현재 위치 불러옴
    const location = useSelector(
        (state: RootState) => state.curLocation.location
    );
    //유저위치를 성공적으로 가져왔는지 확인
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
            });
        };
    }, [container]);
    return { map, container };
};

export default useInitMap;
