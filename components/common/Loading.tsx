import React from 'react';
import tw from 'tailwind-styled-components';
import LoadingSVG from "/public/loading.svg";

interface PropType{
    loadingMsg: string
}

const Loading = (props: PropType) => {

    return (
        <>
            <LoadingWrapper style={{height: 'inherit'}}>{props.loadingMsg}</LoadingWrapper>
            <LoadingSVGwrap>
                <LoadingSVG width={30} height={30} />
            </LoadingSVGwrap>
        </>
    )
}

export default Loading; 

const LoadingWrapper = tw.div`
flex absolute justify-center items-center flex-col w-full h-[100%] z-50 bg-black opacity-40 text-white
`;

const LoadingSVGwrap = tw.div`
absolute top-[55%] left-[49%] animate-spin z-50
`;
