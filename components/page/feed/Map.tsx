import React from 'react';

import useInitMap from "../../../util/hooks/map/useInitMap";

const FeedMap = () => {
    // 맵 초기화 , {지도, 지도를 띄울 dom의 ref}
    const { map, container } = useInitMap();

    console.log(container);
    
    return (
        <div id="container" ref={container} style={{height: '100%', width: '100%'}}/>
    )
}

export default FeedMap