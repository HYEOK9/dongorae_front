import React, { useEffect, useState, useRef } from "react";
import tw from "tailwind-styled-components/";

declare global {
    interface Window {
        kakao: any;
    }
}
//key=>4a5963f87d30eacc276c05ea9e451ccc
const searchmap = () => {
    const container = useRef<HTMLDivElement>();
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                const center = new kakao.maps.LatLng(37.50802, 127.062835);
                const options = {
                    center,
                    level: 9,
                };
                const map = new kakao.maps.Map(
                    container.current as HTMLDivElement,
                    options
                );
                //setMapCenter(center);
            });
        };
    }, [container]);

    return (
        <>
            <MapWrapper>
                <Map id="container" ref={container} />;
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
`;

const Map = tw.div`
w-[600px]
h-[500px]
sm:w-[300px]
sm:h-[250px]
rounded-3xl
`;
