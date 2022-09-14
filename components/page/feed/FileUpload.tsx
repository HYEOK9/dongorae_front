import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '../../context/Theme';

interface PropType{
    imageList: Array<File>,
    setImageList: Dispatch<SetStateAction<Array<File>>>
}

const FileUpload = (props: PropType) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { themeColorset } = useTheme();

    const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.files) {
          return;
        }
        console.log(e.target.files[0]);
        console.log(props.imageList);
        
        console.log([...props.imageList, e.target.files[0]]);
        console.log(props.imageList.concat(e.target.files[0]));
        
        
        props.setImageList((state) => [...state, e.target.files[0]])
        console.log(props.imageList);
        
      }, []);

    const onClickAddBtn = useCallback((e: React.FocusEvent<HTMLInputElement>)=>{
        e.preventDefault
        console.log('click');
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    }, [])


    return (
        <FileUploadForm 
            name="file" 
            encType="multipart/form-data"
            style={{backgroundColor: themeColorset?.baseColor}}
            onClick={onClickAddBtn}>
            <FileInput 
                id="fileUpload" 
                name="file" 
                type="file" 
                accept='image/*' 
                ref={inputRef} 
                onChange={onUploadImage}/>
            <FileUploadBtn 
                htmlFor="fileUpload">
                <AddCircleIcon />    
            </FileUploadBtn>
        </FileUploadForm>
    )
}

const FileUploadForm = tw.form`
w-[200px] h-full 
mr-[10px]
inline-flex justify-center items-center
rounded-[15px]
flex-[0_0_auto]
`

const FileInput = tw.input`
hidden
`

const FileUploadBtn = tw.label`

`

export default FileUpload;