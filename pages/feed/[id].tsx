
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import axios from '../../util/axios';

import SenseInfo from '../../components/page/feed/SenseInfo';
import UserInfo from '../../components/page/feed/UserInfo';
import Loading from '../../components/common/Loading';
import FeedMap from '../../components/page/feed/Map';

import { useTheme } from '../../components/context/Theme';
import { dummyFeedDetail } from '../../util/dummyData';
import { isEmpty } from 'lodash';

import CallMade from '@mui/icons-material/CallMade';

const FeedDetail = () => {
    const { themeColorset } = useTheme();
    const route = useRouter();
    const { query } = route;
    const [feedDetail, setFeedDetail] = useState<Object>({})
    const [senseData, setSenseData] = useState<Object>({})
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    let hashTags;

    async function fetchFeedDetail() {
        axios.get(`/api/feed/detail/${query.id}`)
            .then((res)=>{
                setFeedDetail(res.data?.result);
                hashTags = res.data?.hashTags?.map((tag: string) => tag.startsWith("#") ? tag : `#${tag}`) || [];
            }).catch((e)=>{
                if(isEmpty(feedDetail)){
                    setFeedDetail(dummyFeedDetail.result);
                }
            }).finally(()=>{
                setIsLoading(false);
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
    },[])

    useEffect(()=>{
        makeSenseData();
    },[feedDetail])

    return(<>
    {isLoading && <Loading loadingMsg='피드 정보를 가져오는 중입니다'/>}
    <MainContainer>
        <FeedContainer style={{backgroundColor: themeColorset.bgColor}}>
            <MapContainer>
                <FeedMap/>
            </MapContainer>
            { !isEmpty(feedDetail?.photosUrls) ?? 
                <ImgContainer>
                    {feedDetail?.photosUrls?.map((url:string, idx:number)=>(<ImgHolder src={url} key={idx}/>))}
                </ImgContainer>
            }
            <ContentsContainer>
                <div style={{width: '65%'}}>
                    <TitleHolder>{feedDetail?.title}</TitleHolder>
                    {
                        !isEmpty(hashTags) ?? 
                            <HashTagContainer style={{color: themeColorset.subTextColor}}>
                            {hashTags?.map((e, idx)=>(<span key={idx}>#{idx}hastag{idx}</span>))}
                            </HashTagContainer> 
                    }
                    <AddressHolder>{feedDetail?.location?.placeName} 
                        <CallMade style={{ fontSize: "18px", fontWeight: "bold" }}/> 
                    </AddressHolder>
                    <TextHolder align="justify">{feedDetail?.text}</TextHolder>
                </div>
                <div style={{width: '35%'}}>
                    <InfoContainer style={{backgroundColor: themeColorset.subPointColor}}>
                        <UserInfo writer={feedDetail?.writer}/>
                    </InfoContainer>
                    <InfoContainer style={{backgroundColor: themeColorset.subPointColor}}>
                        <div><span style={{color: themeColorset.pointColor}}>{feedDetail?.location?.placeName}</span>의 감각 정보</div>
                        <SenseInfoContainer>
                            {Object.entries(senseData || {}).map(([key, value])=>{
                                console.log(key, value);
                                
                                return (<SenseInfo key={key} name={key} value={value}/>)
                            })
                            }
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

const TitleHolder = tw.div`
text-[42px] font-bold
pt-[10px]
`

const AddressHolder = tw.div`
text-[24px] font-normal
pt-[14px]
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
`

const SenseInfoContainer = styled.div`
display: grid;
padding: 10px;
grid-gap: 20px;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr;    
`

export default FeedDetail;