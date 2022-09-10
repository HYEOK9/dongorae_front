import React, { useState, useEffect } from "react";
//redux
import { setSenseData } from "../../../store/filterSlice";
import { useDispatch } from "react-redux";
//style
import tw from "tailwind-styled-components";
import { useTheme } from "../../context/Theme";

const SenseFilter = () => {
    const [tempSenseData, setTempSenseData] = useState<number[] | null>([
        50, 50, 50, 50, 50, 50,
    ]);
    const dispatch = useDispatch();
    const { themeColorset } = useTheme();

    return (
        tempSenseData && (
            <SetSenseContainer>
                <SetSenseArea>
                    {tempSenseData.map((sense, index) => (
                        <InputArea key={index}>
                            <TextArea>
                                {(() => {
                                    switch (index) {
                                        case 0:
                                            return "청각";
                                        case 1:
                                            return "시각";
                                        case 2:
                                            return "촉각";
                                        case 3:
                                            return "미각/후각";
                                        case 4:
                                            return "전정감각";
                                        case 5:
                                            return "고유수용성감각";
                                    }
                                })()}
                            </TextArea>
                            <InputContainer>
                                {tempSenseData[index]}
                                <Input
                                    value={sense}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setTempSenseData(
                                            tempSenseData.map((sense, idx) =>
                                                idx === index
                                                    ? Number(e.target.value)
                                                    : sense
                                            )
                                        );
                                    }}
                                    type="range"
                                    min="0"
                                    max="100"
                                ></Input>
                            </InputContainer>
                        </InputArea>
                    ))}
                    <Text>
                        *높을수록 부정적인 점수로, 설정값 이하의 피드만
                        보여줍니다*
                    </Text>
                    <FilterBtn
                        style={{
                            backgroundColor: themeColorset.bgColor,
                            color: themeColorset.textColor,
                        }}
                        onClick={() => {
                            dispatch(setSenseData(tempSenseData));
                        }}
                    >
                        적용
                    </FilterBtn>
                </SetSenseArea>
            </SetSenseContainer>
        )
    );
};

export default React.memo(SenseFilter);

const SetSenseContainer = tw.div`
flex w-full justify-center items-center
`;

const SetSenseArea = tw.div`
flex flex-wrap justify-center w-3/5
`;

const InputArea = tw.div`
flex justify-around items-end w-1/2 h-1/4 my-2
`;

const TextArea = tw.div`
flex w-1/3 justify-center text-sm
`;

const InputContainer = tw.div`
flex flex-col items-center w-4/5 text-xs
`;

const Input = tw.input`
w-2/3
`;

const Text = tw.span`
flex w-full justify-center my-6 text-xs
`;

const FilterBtn = tw.div`
flex relative flex-col justify-end items-center w-24 py-2 border border-solid border-[#c7c7c7] shadow-lg rounded-lg cursor-pointer
`;
