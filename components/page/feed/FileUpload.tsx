import React, { Dispatch, useCallback, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '../../context/Theme';

interface PropType{
    setImageList: Dispatch<SetStateAction<any>>
}

const FileUpload = (props: PropType) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일	
    const { themeColorset } = useTheme();

    const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
          return;
        }
        console.log(e.target.files[0].name);
      }, []);

    const onClickAddBtn = useCallback(()=>{
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    }, [])


    return (
        <FileUploadForm style={{backgroundColor: themeColorset?.baseColor}}>
            <FileInput id="fileUpload" type="file" accept='image/*' 
                ref={inputRef} onChange={onUploadImage}/>
            <FileUploadBtn htmlFor="fileUpload">
                <AddCircleIcon onClick={onClickAddBtn}/>    
            </FileUploadBtn>
        </FileUploadForm>
    )
}

const FileUploadForm = tw.form`
w-[200px] h-full 
mr-[10px]
inline-flex justify-center items-center
rounded-[15px]
`

const FileInput = tw.input`
hidden
`

const FileUploadBtn = tw.label`

`

export default FileUpload;