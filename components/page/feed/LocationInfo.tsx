import React, { useState } from 'react'
import tw from 'tailwind-styled-components';
import { useTheme } from '../../context/Theme';
import styled from 'styled-components';
import CallMade from '@mui/icons-material/CallMade';
import { ILocation } from '../../../types/feed';
import { useRouter } from 'next/router';

interface PropType{
    data: ILocation
}

const LocationInfo = (props: PropType) => {
    const { themeColorset } = useTheme();
    const { data } = props;
    const router = useRouter();

    return (<>
    <LocationContainer>
        <LocationHolder onClick={()=> {router.push('/searchmap')}}>
            <CallMade/> {data?.placeName} 
        </LocationHolder>
        <AddressHolder>
            {`${data?.category || ''} · ${data?.city || ''} ${data?.county || ''}`}
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
hover:underline underline-offset-2
`

const AddressHolder = tw.div`
text-[1px]
`

export default LocationInfo;