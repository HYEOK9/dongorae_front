import { Info } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { useTheme } from '../../components/context/Theme';
import SenseInfo from '../../components/page/feed/SenseInfo';
import UserInfo from '../../components/page/feed/UserInfo';

const dummyText = `
관현악이며, 내는 넣는 군영과 안고, 인간의 인도하겠다는 얼마나 생명을 사막이다. 얼마나 고동을 만물은 봄바람이다. 능히 설레는 갑 동력은 같지 가슴이 수 운다. 이상은 아니더면, 천하를 피가 있음으로써 아니한 그들은 스며들어 날카로우나 것이다. 인생을 이상의 같은 품었기 찾아다녀도, 뿐이다. 위하여서 이것은 그들은 위하여서. 평화스러운 피가 힘차게 뿐이다. 오직 그들은 그것은 보배를 얼마나 내는 우는 뜨거운지라, 교향악이다. 뭇 스며들어 품으며, 우리 대중을 아름다우냐? 뛰노는 피어나는 힘차게 인생에 소리다.이것은 그림자는 그들에게 너의 있을 약동하다. 청춘에서만 있으며, 인생에 충분히 없으면, 두손을 전인 천하를 있으랴?

있으며, 눈에 귀는 하였으며, 되는 피다. 미인을 얼음이 못하다 아니다. 수 것은 봄날의 천하를 그리하였는가? 피가 뜨거운지라, 뼈 천하를 품고 사라지지 설레는 무한한 칼이다. 싹이 있는 남는 그러므로 있으랴? 것은 이상 그림자는 평화스러운 봄날의 것은 끓는 목숨을 새가 끓는다. 찾아다녀도, 같으며, 그러므로 따뜻한 사막이다. 귀는 청춘의 방황하여도, 청춘 열락의 구하지 아니한 발휘하기 것이다. 보배를 맺어, 위하여 청춘은 그러므로 기관과 있음으로써 우리는 뜨고, 사막이다. 그들에게 것이다.보라, 트고, 말이다.

새 뭇 것이다.보라, 위하여서, 굳세게 앞이 것은 얼마나 것이다. 희망의 낙원을 뛰노는 군영과 튼튼하며, 싶이 꽃이 힘있다. 꾸며 이상은 사랑의 방황하여도, 봄날의 구하지 있는 것이다. 얼마나 것은 피에 예가 목숨이 찾아다녀도, 할지라도 지혜는 열매를 칼이다. 사람은 행복스럽고 찾아다녀도, 하여도 크고 철환하였는가? 거선의 가치를 할지라도 작고 칼이다. 싶이 간에 동산에는 불어 방황하였으며, 생생하며, 것이다. 무한한 목숨을 청춘의 우리는 이상의 살 것이다. 피고, 생생하며, 되는 이상은 그들은 쓸쓸하랴? 새가 같이, 대중을 약동하다.`

const FeedDetail = () => {
    const { themeColorset } = useTheme();
    const route = useRouter();
    const { query } = route;
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

    /* 추후 query의 id값을 가지고 fetch */

    return(<>
    <MainContainer>
        <FeedContainer style={{backgroundColor: themeColorset.bgColor}}>
            <MapContainer/>
            <ImgContainer>
                {Array.from({length: 5}, ()=> 0).map((e, idx)=>(<ImgHolder key={idx}/>))}
            </ImgContainer>
            <ContentsContainer>
                <div style={{width: '65%'}}>
                    <SpanContainer>
                        <TitleHolder>PLACENAME</TitleHolder>
                        <AddressHolder>address</AddressHolder>
                    </SpanContainer>
                    <HashTagContainer style={{color: themeColorset.subTextColor}}>
                        {Array.from({length: 5}, ()=> 0).map((e, idx)=>(<span key={idx}>#{idx}hastag{idx}</span>))}
                    </HashTagContainer> 
                    <TextHolder align="justify">
                        {dummyText}
                    </TextHolder>
                </div>
                <div style={{width: '35%'}}>
                    <InfoContainer style={{backgroundColor: themeColorset.subPointColor}}>
                        <UserInfo/>
                    </InfoContainer>
                    <InfoContainer style={{backgroundColor: themeColorset.subPointColor}}>
                        <div>000 장소의 감각 정보</div>
                        <SenseInfoContainer>
                            {senseInfo.map((sense: Object, idx:number)=> 
                                <SenseInfo key={idx} id={idx} sense={sense}/>) }
                        </SenseInfoContainer>
                    </InfoContainer>
                </div>
            </ContentsContainer>
        </FeedContainer>
    </MainContainer>
        </>)
}

const MainContainer = tw.div`
w-full h-full
flex justify-center items-center
`
const FeedContainer = tw.div`
w-[80%] max-w-[1600px]
h-[96%]
rounded-[20px]
overflow-y-auto
`

const MapContainer = tw.div`
w-full h-[400px]
bg-[#1f1f1f]
`

const ImgContainer = tw.div`
w-full h-[200px] max-h-[25%]
p-[20px]
overflow-x-auto overflow-y-hidden
whitespace-nowrap
`

const ContentsContainer = tw.div`
w-full h-auto
flex gap-[10px]
p-[20px]
`
 
const ImgHolder = tw.div`
w-[200px] h-full 
mr-[10px] inline-block
bg-[#1f1f1f] rounded-[15px]
`

const SpanContainer = tw.div`
w-full h-fit
`

const TitleHolder = tw.span`
text-[48px] font-bold
pr-[10px]
`

const AddressHolder = tw.span`
text-[20px] font-normal
`

const HashTagContainer = tw(SpanContainer)`
text-[16px] font-bold
flex gap-[6px]
pt-[10px]
`

const TextHolder = tw.p`
my-[10px] mr-[15px]
leading-6 font-medium
`

const InfoContainer = tw.div`
w-full h-fit
rounded-[20px]
p-[20px] my-[10px]
font-bold
`

const SenseInfoContainer = styled.div`
display: grid;
padding: 10px;
grid-gap: 20px;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr;    
`

export default FeedDetail;