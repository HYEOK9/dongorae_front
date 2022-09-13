import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { useTheme } from '../../context/Theme';
import Modal from '../../../HOC/ModalPortal'

import useInitMap from "../../../util/hooks/map/useInitMap";
import displayMarker from "../../../util/hooks/map/displayMarker";
import { ILocation } from '../../../types/feed';
import { MarkerType } from '../../../types/map';
//styled
import { BasicInput } from '../../styled/Inputs'
import { RoundBtn } from '../../styled/Buttons'
//icons
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
                <div style={{display: 'flex', justifyContent:'center', gap:'10px'}}>
                    <BasicInput placeholder='장소를 검색해보세요' width={'500px'}/>
                    <RoundBtn borderRadius="20px" theme={themeColorset}> 검색 </RoundBtn>
                </div>
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

const SearchLocationInput = tw.input`

`

export default FeedMap;