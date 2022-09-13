import React, { useEffect, useState, useRef } from "react";
import tw from "tailwind-styled-components";
import { useTheme } from "../../components/context/Theme";
import { HashTagHolder } from "../../components/styled/Feed";
import FeedMap from "../../components/page/addFeed/Map";
import FileUpload from "../../components/page/feed/FileUpload";

const AddFeed = () => {
    const { themeColorset } = useTheme();
    const [formData, setFormData] = useState<FormData>(new FormData);
    const [feedData, setFeedData] = useState<any>({});
    const [imageList, setImageList] = useState<Array<File>>([]);

    return(<>
    <MainContainer>
        <FeedContainer style={{backgroundColor: themeColorset.bgColor}}>
            <MapContainer>
                <FeedMap feedData={feedData} setFeedData={setFeedData}/>
            </MapContainer>
            <ImgContainer>
                <FileUpload imageList={imageList} setImageList={setImageList}/>
                {imageList.map((image, idx)=>
                    <ImgHolder 
                        key={idx}
                        style={{backgroundColor: themeColorset.baseColor, display: 'flex'}}>
                            {image.name || ''}
                    </ImgHolder>
                )}
            </ImgContainer>
            <ContentsContainer>
                <div>
                    <SpanContainer>
                        <TitleHolder>PLACENAME</TitleHolder>
                        <AddressHolder>address</AddressHolder>
                    </SpanContainer>
                    <HashTagContainer style={{color: themeColorset.subTextColor}}>
                        {Array.from({length: 5}, ()=> 0).map((e, idx)=>(
                        <HashTagHolder theme={themeColorset} key={idx}>#{idx}hastag{idx}</HashTagHolder>))}
                    </HashTagContainer> 
                    <TextHolder align="justify">
                    </TextHolder>
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
relative
w-full h-[400px]
bg-[#1f1f1f]
`

const ImgContainer = tw.div`
w-full h-[200px] max-h-[25%]
p-[20px]
overflow-x-auto overflow-y-hidden
whitespace-nowrap
flex
`

const ImgHolder = tw.div`
w-[200px] h-full 
mr-[10px] p-[14px] 
flex items-center justify-center
text-center
whitespace-pre-wrap
inline-block 
rounded-[15px]
text-[12px]
flex-[0_0_auto]
`

const ContentsContainer = tw.div`
w-full h-auto
flex gap-[10px]
p-[20px]
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
mt-[5px] mb-[10px]
`

const TextHolder = tw.p`
my-[10px] mr-[15px]
leading-6 font-medium
`

export default AddFeed;