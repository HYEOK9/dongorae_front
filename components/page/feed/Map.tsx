import React, { useEffect, useState } from 'react';

import useInitMap from "../../../util/hooks/map/useInitMap";
import displayMarker from "../../../util/hooks/map/displayMarker";
import { ILocation } from '../../../types/feed';
import { MarkerType } from '../../../types/map';

interface PropType{
    data: ILocation
}

const FeedMap = (props: PropType) => {
    const {map, container} = useInitMap();
    const [curPlacesMarkers, setCurPlacesMarkers] = useState<MarkerType[]>([
        {
            marker: null,
            customOverlay: null,
        },
    ]);
    const { data } = props;

    useEffect(()=>{
        if(map)
            displayMarker({x: data?.longitude, y: data?.latitude, 'place_name': ['hi']},
                map, setCurPlacesMarkers);
    },[map])

    return (
        <div id="container" ref={container} style={{height: '100%', width: '100%'}}/>
    )
}

export default FeedMap;