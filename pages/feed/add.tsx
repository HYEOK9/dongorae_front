import React, { useEffect, useState, useRef, HtmlHTMLAttributes } from "react";
import tw from "tailwind-styled-components";
import { useTheme } from "../../components/context/Theme";
import { HashTagHolder } from "../../components/styled/Feed";
import FeedMap from "../../components/page/addFeed/Map";
import FileUpload from "../../components/page/feed/FileUpload";
import { BasicInput, BasicTextarea } from "../../components/styled/Inputs";
import SlateRichTextEditor from "../../components/page/addFeed/SlateRichText";
import { RoundBtn } from "../../components/styled/Buttons";

const AddFeed = () => {
    const { themeColorset } = useTheme();
    const [formData, setFormData] = useState<FormData>(new FormData);
    const [feedData, setFeedData] = useState<any>({});
    const [imageList, setImageList] = useState<Array<File>>([]);

    const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFeedData((state:any)=> {console.log(state); return {...state, [name]:value}});
    }

    useEffect(()=>{
        console.log(feedData);
        
    },[feedData])

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
                    <BasicInput width={"100%"} name="title" placeholder="제목을 입력하세요" onChange={onChangeInput}/>
                    <BasicTextarea name="text" placeholder="내용을 입력하세요" onChange={onChangeInput}/>
                </ContentsContainer>
            </FeedContainer>
        </MainContainer>
        <RoundBtn 
            style={{width: '200px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translate(-50%, 0)'}}> 
            저장
        </RoundBtn>
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
flex flex-col gap-[10px]
p-[20px]
`

const TextEditorContainer = tw.div`
h-[400px]
p-[10px_20px]
`

export default AddFeed;