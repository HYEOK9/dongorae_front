import React, { useState } from 'react'
import tw from 'tailwind-styled-components';
import { useTheme } from '../../context/Theme';
import styled from 'styled-components';
import CallMade from '@mui/icons-material/CallMade';
import { ILocation } from '../../../types/feed';

interface PropType{
    data: ILocation
}

const LocationInfo = (props: PropType) => {
    const { themeColorset } = useTheme();
    const { data } = props;
    console.log(location, props);
    

    return (<>
    <LocationContainer>
        <LocationHolder>
            <CallMade/> {data?.placeName} 
        </LocationHolder>
        <AddressHolder>
            {`${data.category} · ${data?.city} ${data?.county}`}
        </AddressHolder>
    </LocationContainer>
    </>)
}

const LocationContainer = tw.div`
w-full
flex flex-col gap-[6px]
`

const LocationHolder = tw.div`
flex items-center gap-[4px]
`

const AddressHolder = tw.div`
text-[12px]
`

export default LocationInfo;