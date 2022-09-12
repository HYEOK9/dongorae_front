import React, { useEffect } from 'react';

import useInitMap from "../../../util/hooks/map/useInitMap";

const FeedMap = () => {
    const {map, container} = useInitMap()

    return (
        <div id="container" ref={container} style={{height: '100%', width: '100%'}}/>
    )
}

export default FeedMap;