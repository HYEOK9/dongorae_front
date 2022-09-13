import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { useTheme } from '../../../context/Theme';
import { RoundBtn } from '../../../styled/Buttons';

interface PropType{
    data: any;
}

const SearchResult = (props: PropType) => {
    const { themeColorset } = useTheme();
    const { data } = props;

    return (
        <>
            <ResultContainer style={{backgroundColor: themeColorset.baseColor}}>
                <TextHolder fontSize={'18px'} bold> { data.place_name } </TextHolder>
                <TextHolder fontSize={'12px'}> { data.road_address_name } </TextHolder>
                <TextHolder fontSize={'12px'} color={themeColorset.subTextColor}> { data.category_name } </TextHolder>
                <SelectBtn theme={themeColorset}>선택</SelectBtn>
            </ResultContainer>
        </>
    )
}

const ResultContainer = tw.div`
inline-block relative
w-[330px] max-w-[400px]; h-fit
p-[10px] m-[10px]
rounded-[10px]
`

const TextHolder = styled.div`
font-weight: ${(props)=>props.bold ? 'bold' : 'normal'};
color: ${(props)=>props.color || 'inherit'};
font-size: ${(props)=>props.fontSize || '12px'};
margin: 5px 0px;
`

const SelectBtn = styled.button`
position: absolute;
right: 10px;
bottom: 10px;
border-radius: 4px;
background-color:  ${(props)=>props.theme.textColor || 'white'};
color:  ${(props)=>props.theme.baseColor || 'white'};
font-weight: bold;
font-size: 12px;
padding: 5px;
`

export default SearchResult;