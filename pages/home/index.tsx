import { useTheme } from "../../components/context/Theme";
import React, { useEffect, useState, useRef } from "react";
import tw from "tailwind-styled-components/";
import Feed from "../../components/home/Feed"

declare global {
    interface Window {
    }
}

const temp = [
    {hashTags: '#학교 #경희대학교 #대학교', latitude: 37.239563856871186, longitude: 127.08358911573488, photos: ['https://www.khu.ac.kr/kor/resources/user/img/pc/contents/temp/education/imgSub340000_01.jpg'], placeName: '경희대학교 국제캠퍼스', text: '경희대학교(慶熙大學校, Kyung Hee University)는 1911년에 개교한 신흥무관학교(新興武官學校)의 후신으로 1949년 5월 12일 개교한 대한민국의 4년제 사립 종합대학이다.'},
    {hashTags: '#아파트 #성수동', latitude: 37.53911827564559, longitude: 127.04591290214566, photos: null, placeName: '트리마제 아파트', text: '트리마제는 대한민국 서울특별시 성동구 성수동1가에 위치한 고급 아파트 단지로, 한양개발과 두산중공업이 개발하였다. 이 주상복합 아파트의 이름은 3개라는 뜻의 ‘트리’와 인상을 의미하는 이미지를 합쳐 작명한 것이다.'},
    {hashTags: '#주말나들이 #테마파크', latitude: 37.53911827564559, longitude: 127.04591290214566, photos: null, placeName: '한국민속촌', text: '한국민속촌은 대한민국 경기도 용인시 기흥구 보라동 민속촌로 90에 위치한 테마파크이다. 한국의 민속적인 삶을 종합적으로 재현하고 있는 사실적이고도 흥미로운 곳이다. 한국의 전통 문화를 보고 체험해 볼 수 있다.'}
]

const Home = () => {
    return (<>
        <HomeContainer>
            <FeedContainer> 
                {temp.map((feed, idx) => <Feed key={idx} data={feed}/>)}
            </FeedContainer>
        </HomeContainer>
    </>)
}

const HomeContainer = tw.section`
flex justify-center w-screen h-[90vh]
`;

const FeedContainer = tw.div`
w-[90vw] max-w-[1800px] flex flex-wrap justify-center
`

export default Home