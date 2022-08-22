import tw from "tailwind-styled-components";
import React, { useState, useEffect } from "react";
import { allSi, allGu } from "../../../area";

interface propType {
    siChecked: boolean;
    agreed: boolean;
    setSiChecked: React.Dispatch<React.SetStateAction<boolean>>;
    setGuChecked: React.Dispatch<React.SetStateAction<boolean>>;
    setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetUserArea = ({
    siChecked,
    setSiChecked,
    setGuChecked,
    agreed,
    setAgreed,
}: propType) => {
    const [si, setSi] = useState("-선택-");
    const [gu, setGu] = useState("-선택-");
    const [guList, setGuList] = useState<string[]>([]);

    useEffect(() => {
        if (si != "-선택-") {
            setSiChecked(true);
            setGuList(allGu[allSi.indexOf(si)]);
            gu != "-선택-" ? setGuChecked(true) : setGuChecked(false);
        } else setSiChecked(false);
    }, [si, gu, agreed]);

    return (
        <>
            <AreaInfoWrapper>
                <SelectArea>
                    <TextWrap>
                        <Text>지역선택*</Text>
                    </TextWrap>
                    <SelectWrapper>
                        <Select
                            value={si}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setSi(event.target.value);
                            }}
                        >
                            {allSi.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </Select>
                        {siChecked && (
                            <Select
                                value={gu}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setGu(event.target.value);
                                }}
                            >
                                {guList?.map((item) => (
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

const SelectWrapper = tw.div`
flex -ml-3 mt-3 -mb-3
`;

const Select = tw.select`
px-3 py-2 bg-neutral-200 mx-[10px] rounded-lg cursor-pointer font-semibold ml-2
`;

const AgreeWrap = tw.div`
flex w-1/2 justify-end w-2/5 text-[13px] mt-10 ml-2
`;

const CheckBox = tw.input`
ml-2 mt-[2px] w-[15px] h-[15px]
`;
