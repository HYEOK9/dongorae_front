
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import axios from 'axios';

import SenseInfo from '../../components/page/feed/SenseInfo';
import UserInfo from '../../components/page/feed/UserInfo';
import LocationInfo from '../../components/page/feed/LocationInfo';
import Loading from '../../components/common/Loading';
import FeedMap from '../../components/page/feed/Map';

import { useTheme } from '../../components/context/Theme';
import { isEmpty } from 'lodash';

import { IFeedDetail, ISensedata, ILocation } from '../../types/feed';

const FeedDetail = () => {
    const { themeColorset } = useTheme();
    const route = useRouter();
    const { query } = route;
    const [feedDetail, setFeedDetail] = useState<IFeedDetail | null>(null);
    const [senseData, setSenseData] = useState<ISensedata | null>(null);
    const [location, setLocation] = useState<ILocation | null>(null)
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    let hashTags;
    
    async function fetchFeedDetail() {
        setIsLoading(true);
        axios.get(`https://dongore-backend2.herokuapp.com/api/feed/detail/${query.id}`)
            .then((res)=>{
                setFeedDetail(res.data?.result);
                hashTags = res.data?.hashTags?.map((tag: string) => tag.startsWith("#") ? tag : `#${tag}`) || [];
                setIsLoading(false);
            }).catch((e)=>{
                // if(isEmpty(feedDetail)){
                //     setFeedDetail(dummyFeedDetail.result);
                // }
            })
    }

    function makeSenseData() {
        const senseData = feedDetail?.sensedata;
        if(!isEmpty(senseData)){
            delete senseData.id;
        }
        setSenseData(senseData)
    }

    useEffect(()=>{
        fetchFeedDetail();
    },[query])

    useEffect(()=>{
        makeSenseData();
        setLocation(feedDetail?.location)
    },[feedDetail])

    return(<>
    {isLoading && <Loading loadingMsg='피드 정보를 가져오는 중입니다'/>}
    <MainContainer>
        <FeedContainer style={{backgroundColor: themeColorset.bgColor}}>
            <MapContainer>
                <FeedMap/>
            </MapContainer>
            <ContentsContainer>
                {/* Left Section */}
                <div style={{width: 'calc(65% - 20px)'}}>
                    {!isEmpty(feedDetail?.photoUrls) && 
                        <ImgContainer>
                        {feedDetail?.photoUrls?.
                            map((url:string, idx:number)=>(<ImgHolder src={url} key={idx}/>))}
                        </ImgContainer>
                    }
                    <TitleHolder>{feedDetail?.title}</TitleHolder>
                    {/* {
                        !isEmpty(hashTags) ?? 
                            <HashTagContainer style={{color: themeColorset.subTextColor}}>
                            {hashTags?.map((e, idx)=>(<span key={idx}>#{idx}hastag{idx}</span>))}
                            </HashTagContainer> 
                    } */}
                    <TextHolder align="justify">{feedDetail?.text}</TextHolder>
                </div>
                {/* Right Section */}
                <div style={{width: '35%'}}>
                    <InfoContainer style={{backgroundColor: themeColorset.subPointColor}}>
                        <UserInfo writer={feedDetail?.writer}/>
                    </InfoContainer>
                    <InfoContainer style={{backgroundColor: themeColorset.subPointColor}}>
                        <LocationInfo data={location}/>
                    </InfoContainer>
                    <InfoContainer style={{backgroundColor: themeColorset.subPointColor}}>
                        <div><span style={{color: themeColorset.pointColor}}>{location?.placeName}</span>의 감각 정보</div>
                        <SenseInfoContainer>
                            {Object.entries(senseData || {}).map(([key, value])=>
                                (<SenseInfo key={key} name={key} value={value}/>)
                            )}
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
pb-[10px]
overflow-x-auto overflow-y-hidden
whitespace-nowrap
`

const ContentsContainer = tw.div`
w-full h-auto
flex gap-[10px]
p-[20px]
`
 
const ImgHolder = tw.img`
w-[200px] h-full 
mr-[10px] inline-block
bg-[#1f1f1f] rounded-[15px]
`

const SpanContainer = tw.div`
w-full h-fit
`

const TitleHolder = tw.div`
text-[42px] font-bold
pt-[10px]
`

const HashTagContainer = tw(SpanContainer)`
text-[16px] font-bold
flex gap-[6px]
pt-[6px]
`

const TextHolder = tw.p`
my-[10px] mr-[15px]
leading-6 font-medium
`

const InfoContainer = tw.div`
w-full h-fit
rounded-[20px]
p-[20px] m-[10px]
font-bold
flex flex-col gap-[6px]
`

const SenseInfoContainer = styled.div`
display: grid;
padding: 10px;
grid-gap: 20px;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr;    
`

export default FeedDetail;