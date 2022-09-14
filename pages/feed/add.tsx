import React, { useEffect, useState, useRef, HtmlHTMLAttributes } from "react";
import tw from "tailwind-styled-components";
import { useTheme } from "../../components/context/Theme";
import FeedMap from "../../components/page/addFeed/Map";
import FileUpload from "../../components/page/feed/FileUpload";
import { BasicInput, BasicTextarea } from "../../components/styled/Inputs";
import Modal from '../../HOC/ModalPortal'
import { RoundBtn } from "../../components/styled/Buttons";
import SetUserSense from "../../components/auth/signUp/secondPage/SetUserSense";

const AddFeed = () => {
    const { themeColorset } = useTheme();
    const [formData, setFormData] = useState<FormData>(new FormData);
    const [feedData, setFeedData] = useState<any>({});
    const [imageList, setImageList] = useState<Array<File>>([]);
    const [senseData, setSenseData] = useState<any>({});

    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);

    const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFeedData((state:any)=> {console.log(state); return {...state, [name]:value}});
    }

    const onClickSave = (e) => {
        e.preventDefault();
        
        const form = new FormData();
        form.append('key', 0)
        Object.entries(feedData).forEach(([key, value])=> {
            form.append(key, value);
        });
        
        Object.entries(senseData).forEach(([key, value])=> {
            form.append(key, value);
        })

        form.append('photo', imageList)
        
        setFormData(form);
        console.log(form, formData)
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
        <FloatBtnContainer>
            <RoundBtn
                onClick={()=>{setIsModalOpen(true)}}
                style={{width: '160px', backgroundColor: themeColorset.pointColor}}> 감각정보 추가하기 
            </RoundBtn>
            <RoundBtn 
                onClick={onClickSave}
                style={{width: '200px'}}> 
                저장
            </RoundBtn>
        </FloatBtnContainer>
        <Modal showModal={isModalOpen} setShowModal={setIsModalOpen}>
            <SetUserSense senseData={senseData} setSenseData2={setSenseData}></SetUserSense>
        </Modal>
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

const FloatBtnContainer = tw.div`
absolute bottom-[10px]
w-[100vw]
flex justify-center gap-[10px]
`

export default AddFeed;