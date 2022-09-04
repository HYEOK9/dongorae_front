import React, { useEffect, useState, useRef } from "react";
import tw from "tailwind-styled-components";
import { useTheme } from "../../components/context/Theme";
import TextEditor from "../../components/common/textEditor";

const AddFeed = () => {
    const {themeColorset} = useTheme();

    return (<>
    <MainContainer>
        <TextEditorContainer  style={{backgroundColor: themeColorset.bgColor}}>
            <TextEditor/>
        </TextEditorContainer>
    </MainContainer>
    </>)
}

const MainContainer = tw.div`
w-full h-full
flex justify-center items-center
`
const TextEditorContainer = tw.div`
w-[80%] max-w-[1600px]
h-[96%]
rounded-[20px]
`

export default AddFeed;
