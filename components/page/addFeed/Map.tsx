import React, { useCallback, useEffect, useState } from 'react';

import useInitMap from "../../../util/hooks/map/useInitMap";
import displayMarker from "../../../util/hooks/map/displayMarker";
import { ILocation } from '../../../types/feed';
import { MarkerType } from '../../../types/map';
import tw from 'tailwind-styled-components';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '../../context/Theme';
import styled from 'styled-components';
import Modal from '../../modal/Modal'


interface PropType{
    data: ILocation
}

const FeedMap = (props: PropType) => {
    const { themeColorset } = useTheme();

    const {map, container} = useInitMap();
    const [mapLoaded, setMapLoaded] = useState<Boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
    const [curPlacesMarkers, setCurPlacesMarkers] = useState<MarkerType[]>([
        {
            marker: null,
            customOverlay: null,
        },
    ]);
    const { data } = props;

    const onClickAddBtn = useCallback(()=>{
        setIsModalOpen(true);
    }, [])
    
    useEffect(()=>{
        if(map && mapLoaded)
            displayMarker(
                {x: data?.longitude, y: data?.latitude, 'place_name': 'hi'},
                map, setCurPlacesMarkers);
    },[mapLoaded])

    return (
        <>
            {mapLoaded ? 
                <div id="container" ref={container} style={{ height: '100%', width: '100%' }} />
                : <MapContainer onClick={onClickAddBtn}>
                    <TextHolder theme={themeColorset}> 장소 추가하기  <AddCircleIcon/>  </TextHolder>
                </MapContainer>
            }
            <Modal showModal={isModalOpen} setShowModal={setIsModalOpen}>
                <input></input>
            </Modal>
        </>
    )
}

const MapContainer = tw.div`
w-[100%] h-[100%]
rounded-[20px_20px_0_0]
border-4 border-solid
flex flex-col gap-[6px] justify-center items-center
`

const TextHolder = styled.div`
padding: 10px 20px;
border-radius: 10px;
background-color: ${({theme})=>theme.bgColor}
`

export default FeedMap;