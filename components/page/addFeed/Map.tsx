import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { useTheme } from '../../context/Theme';
import Modal from '../../../HOC/ModalPortal'

import SearchResult from './modal/searchResult';

import useInitMap from "../../../util/hooks/map/useInitMap";
import displayMarker from "../../../util/hooks/map/displayMarker";
import { ILocation } from '../../../types/feed';
import { MarkerType } from '../../../types/map';
//hooks
import useKeywordSearch from '../../../util/hooks/map/useKakaoMapSearch'

//styled
import { BasicInput } from '../../styled/Inputs'
import { RoundBtn } from '../../styled/Buttons'
//icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Loading from '../../common/Loading';
interface PropType{
    feedData: any,
    setFeedData: Dispatch<SetStateAction<any>>
}

const FeedMap = (props: PropType) => {
    const { themeColorset } = useTheme();

    const { map, container } = useInitMap();
    //Modal State
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
    const [input, setInput] = useState<string>('');
    const  { result, searchError } = useKeywordSearch(input);

    //Map State
    const [isMapLoading, setIsMapLoading] =  useState<Boolean>(false)
    const [selectedPlace, setSelectedPlace] = useState<any>(null)
    const [curPlacesMarkers, setCurPlacesMarkers] = useState<MarkerType[]>([
        {
            marker: null,
            customOverlay: null,
        },
    ]);

    const onClickAddLocation = useCallback(()=>{
        setIsModalOpen(true);
    }, [])


    useEffect(()=>{
        console.log(selectedPlace);
        setIsMapLoading(true);
        setTimeout(()=>{
            setIsMapLoading(false);
        }, 3000);

        if(map && selectedPlace){
            displayMarker(
                {x: selectedPlace?.x, y: selectedPlace?.y, 'place_name': selectedPlace['place_name']},
                map, setCurPlacesMarkers);
            
            const placeInfo = {
                address_category: '',
                address_city: selectedPlace.road_address_name.split(' ')[0] || '',
                address_county: selectedPlace.road_address_name.split(' ')[1] || '',
                address_latitude: selectedPlace.y,
                address_longitude: selectedPlace.x,
                address_placeName: selectedPlace.address_name,
            }
            props.setFeedData((state:any) => {console.log({...state, ...placeInfo}); return {...state, ...placeInfo}})
            
        }
    },[selectedPlace])

    return (
        <>
            <div id="container" ref={container} style={{ height: '100%', width: '100%', position: 'relative', display: selectedPlace? 'block' : 'none' }} />
            {!selectedPlace && 
                <MapContainer onClick={onClickAddLocation} >
                    <TextHolder theme={themeColorset}> 장소 추가하기  <AddCircleIcon/>  </TextHolder>
                </MapContainer>
            }
            
            <Modal showModal={isModalOpen} setShowModal={setIsModalOpen}>
                <FlexDiv>
                    <BasicInput placeholder='장소를 검색해보세요' width={'600px'} 
                        onChange={(e)=> {setInput(e.target.value)}}/>
                </FlexDiv>
                <FlexDiv height='calc(100% - 80px)'>
                    <ResultContainer>
                        { result.map((r:any)=>
                            (<SearchResult key={r.id} data={r} 
                                setPlace={setSelectedPlace}
                                setModalFlag={setIsModalOpen}/>)
                        )}
                    </ResultContainer>
                </FlexDiv>

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

const ResultContainer = tw.div`
w-[700px]
my-[10px] py-[20px]
rounded-[20px]
overflow-y-scroll overflow-x-unset
`

const FlexDiv = styled.div`
display: flex;
justify-content: center;
gap: 10px;
height: ${(props)=> props.height || 'auto'}
`


export default FeedMap;