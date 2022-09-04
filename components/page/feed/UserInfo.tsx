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
    const [senseInfo, setSenseInfo] = useState(
        [
            {name: '청각', value: 1},
            {name: '시각', value: 5},
            {name: '전정감각', value: 2},
            {name: '촉각', value: 4},
            {name: '고유수용성감각', value: 4},
            {name: '구강감각/미각/후각', value: 1},
        ]
    )

    return (<>
    <UserInfoContainer style={{backgroundColor: themeColorset.subPointColor}}>
        <UserProfileContainer>
            <AccountCircleIcon/>
            <div style={{marginTop: '4px'}}>{props?.nickname || 'User Nickname'}</div>
        </UserProfileContainer>
        <SenseInfoContainer>
            {senseInfo.map((sense, idx)=> 
                <SenseInfo key={idx} id={idx} sense={sense}/>) }
        </SenseInfoContainer>
    </UserInfoContainer>
    </>)
}

const UserInfoContainer = tw.div`
w-full h-[400px]
rounded-[20px]
p-[20px]
`

const UserProfileContainer = tw.div`
w-full h-[40px]
flex justify-start items-center gap-[6px]
font-bold
`

const SenseInfoContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr;
`

export default UserInfo;