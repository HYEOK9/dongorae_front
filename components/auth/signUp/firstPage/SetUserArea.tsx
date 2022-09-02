import tw from "tailwind-styled-components";
import React, { useState, useEffect } from "react";
import { allSi, allGu } from "../../../../area";

interface propType {
    si: string;
    gu: string;
    agreed: boolean;
    setSi: React.Dispatch<React.SetStateAction<string>>;
    setGu: React.Dispatch<React.SetStateAction<string>>;
    setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetUserArea = ({ si, gu, setSi, setGu, agreed, setAgreed }: propType) => {
    const [guList, setGuList] = useState<string[]>([]);
    const [inputStart, setInputstart] = useState(false);
    useEffect(() => {
        setGu("-선택-");
        if (si !== "-선택-") {
            setInputstart(true);
            setGuList(allGu[allSi.indexOf(si)]);
        }
    }, [si]);

    return (
        <>
            <AreaInfoWrapper>
                <SelectArea>
                    <TextWrap>
                        <Text>지역선택*</Text>
                        {gu === "-선택-" && inputStart && (
                            <WarnInfo>지역을 선택해주세요</WarnInfo>
                        )}
                    </TextWrap>
                    <SelectWrapper>
                        <Select
                            value={si}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setSi(event.target.value);
                                setInputstart(true);
                            }}
                        >
                            {allSi.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </Select>
                        {si != "-선택-" && (
                            <Select
                                value={gu}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setGu(event.target.value);
                                }}
                            >
                                {guList.map((item) => (
                                    <option value={item} key={item}>
                                        {item}
                                    </option>
                                ))}
                            </Select>
                        )}
                    </SelectWrapper>
                </SelectArea>
                <AgreeWrap>
                    위치정보제공 동의
                    <CheckBox
                        type="checkbox"
                        checked={agreed}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setAgreed(e.target.checked);
                        }}
                    />
                </AgreeWrap>
            </AreaInfoWrapper>
        </>
    );
};
export default React.memo(SetUserArea);

const AreaInfoWrapper = tw.div`
flex justify-center items-center w-full mb-12
`;

const SelectArea = tw.div`
flex flex-col w-2/5
`;

const TextWrap = tw.div`
flex w-4/5
`;

const Text = tw.h3`
font-semibold text-[13px]
`;

const WarnInfo = tw.span`
absolute left-[120px] text-[11px] text-red-500
`;

const SelectWrapper = tw.div`
flex -ml-3 mt-3 -mb-3
`;

const Select = tw.select`
px-3 h-[40px] bg-neutral-200 mx-[10px] rounded-lg cursor-pointer text-center font-semibold ml-2 sm:text-[11px]
`;

const AgreeWrap = tw.div`
flex w-1/2 justify-end items-center w-2/5 text-[13px] mt-10 ml-2
`;

const CheckBox = tw.input`
ml-2
`;
