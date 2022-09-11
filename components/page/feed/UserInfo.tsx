import React, { useState } from 'react'
import tw from 'tailwind-styled-components';
import { useTheme } from '../../context/Theme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SenseInfo from './SenseInfo';
import styled from 'styled-components';

interface PropType{
    nickname: string
}

const UserInfo = (props: PropType) => {
    const { themeColorset } = useTheme();


    return (<>
    <UserProfileContainer>
        <AccountCircleIcon/>
        <div style={{marginTop: '4px'}}>{props?.nickname || 'User Nickname'}</div>
    </UserProfileContainer>
    </>)
}

const UserProfileContainer = tw.div`
w-full h-[40px]
flex justify-start items-center gap-[6px]
`

export default UserInfo;