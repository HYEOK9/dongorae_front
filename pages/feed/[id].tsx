
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import axios from '../../util/axios';

import SenseInfo from '../../components/page/feed/SenseInfo';
import UserInfo from '../../components/page/feed/UserInfo';
import Loading from '../../components/common/Loading';

import { useTheme } from '../../components/context/Theme';
import { dummyFeedDetail } from '../../util/dummyData';
import { isEmpty } from 'lodash';

interface PropType_FeedDetail{
    "feedId": number,
    "writerId": number,
    "title": string,
    "text": string,
    "writer": string,
    "mainPhoto": null,
    "sensedata": Object,
}

const FeedDetail = () => {
    const { themeColorset } = useTheme();
    const route = useRouter();
    const { query } = route;
    const [feedDetail, setFeedDetail] = useState<Object>({})
    const [senseInfo, setSenseInfo] = useState<Object>({})
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    async function fetchFeedDetail() {
        try{
            setIsLoading(true);
            // 5초 이상 로딩 안될시 임시로 dummyData 넣어줌
            // -> 추후 로딩에러 컴포넌트로 변경 예정
            setInterval(()=>{
                if(isEmpty(feedDetail)){
                    setFeedDetail(dummyFeedDetail.result);
                    setIsLoading(false);
                    console.log(isLoading);
                    
                }
            },1000)

            const res = await axios.get(`/api/feed/detail/${query.id}`)
        
            setFeedDetail(res.data?.result);
            setIsLoading(false);
        }
        catch(e){

        }
    }

    useEffect(()=>{
        fetchFeedDetail();
    },[feedDetail])

    return(<>
    {isLoading && <Loading loadingMsg='피드 정보를 가져오는 중입니다'/>}
    <MainContainer>
        <FeedContainer style={{backgroundColor: themeColorset.bgColor}}>
            <MapContainer/>
            <ImgContainer>
                {feedDetail?.photos?.map((url:string, idx:number)=>(<ImgHolder src={url} key={idx}/>))}
            </ImgContainer>
            <ContentsContainer>
                <div style={{width: '65%'}}>
                    <SpanContainer>
                        <TitleHolder>{feedDetail?.title}</TitleHolder>
                        <AddressHolder>{feedDetail?.location?.placeName}</AddressHolder>
                    </SpanContainer>
                    <HashTagContainer style={{color: themeColorset.subTextColor}}>
                        {Array.from({length: 5}, ()=> 0).map((e, idx)=>(<span key={idx}>#{idx}hastag{idx}</span>))}
                    </HashTagContainer> 
                    <TextHolder align="justify">
                    </TextHolder>
                </div>
                <div style={{width: '35%'}}>
                    <InfoContainer style={{backgroundColor: themeColorset.subPointColor}}>
                        <UserInfo/>
                    </InfoContainer>
                    <InfoContainer style={{backgroundColor: themeColorset.subPointColor}}>
                        <div>000 장소의 감각 정보</div>
                        <SenseInfoContainer>
                            {Object.values(senseInfo).map((sense: Object, idx:number)=> 
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
 
const ImgHolder = tw.image`
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