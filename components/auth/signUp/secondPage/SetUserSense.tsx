import React, { useState, useEffect } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import tw from "tailwind-styled-components";

interface propType {
    setSenseData: React.Dispatch<React.SetStateAction<number[] | null>>;
}
const SetUserSense = ({ setSenseData }: propType) => {
    const [chungak, setChungak] = useState(50);
    const [sigak, setSigak] = useState(50);
    const [chokgak, setChokgak] = useState(50);
    const [migak, setMigak] = useState(50);
    const [junjung, setJunjung] = useState(50);
    const [goyu, setGoyu] = useState(50);

    useEffect(() => {
        setSenseData([chungak, sigak, chokgak, migak, junjung, goyu]);
    }, [chungak, sigak, chokgak, migak, junjung, goyu]);

    return (
        <>
            <Container>
                <TextArea>
                    <TextWrap>
                        <Span>예민</Span> <Span>둔감</Span>
                    </TextWrap>
                </TextArea>
                <InputWrap>
                    <Text>청각</Text>
                    <Input
                        value={chungak}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setChungak(Number(e.target.value));
                        }}
                        type="range"
                        id="청각"
                        name="청각"
                        min="0"
                        max="100"
                    />
                </InputWrap>
                <InputWrap>
                    <Text>시각</Text>
                    <Input
                        value={sigak}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSigak(Number(e.target.value));
                        }}
                        type="range"
                        id="시각"
                        name="시각"
                        min="0"
                        max="100"
                    />
                </InputWrap>
                <InputWrap>
                    <Text>촉각</Text>
                    <Input
                        value={chokgak}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setChokgak(Number(e.target.value));
                        }}
                        type="range"
                        id="촉각"
                        name="촉각"
                        min="0"
                        max="100"
                    />
                </InputWrap>
                <InputWrap>
                    <Text>미각/후각</Text>
                    <Input
                        value={migak}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setMigak(Number(e.target.value));
                        }}
                        type="range"
                        id="미각"
                        name="미각"
                        min="0"
                        max="100"
                    />
                </InputWrap>
                <TextArea>
                    <TextWrap>
                        <Span>미흡</Span> <Span>발달</Span>
                    </TextWrap>
                </TextArea>
                <InputWrap>
                    <Text>
                        전정감각
                        <QuestionMarkIcon
                            onClick={() => {
                                alert(
                                    "중력을 느끼는 감각으로 우리에게 위와 아래에 대해 알려주고, 우리가 똑바로 서있는지 아닌지 알려줍니다. 이 감각은 우리가 움직이고 있는지, 정지하고 있는지 그리고 사물이 움직이고 있는지 움직임이 없는지에 대한 것을 알아차리게 해 줍니다."
                                );
                            }}
                            style={{
                                width: "14px",
                                marginBottom: "3px",
                                color: "#8fa2ff",
                                cursor: "pointer",
                            }}
                        />
                    </Text>
                    <Input
                        value={junjung}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setJunjung(Number(e.target.value));
                        }}
                        type="range"
                        id="전정감각"
                        name="전정감각"
                        min="0"
                        max="100"
                    />
                </InputWrap>
                <InputWrap>
                    <Text>
                        고유수용성감각
                        <QuestionMarkIcon
                            onClick={() => {
                                alert(
                                    "운동감각이라고도 하며, 신체를 움직일 때 관절과 근육에서 느껴지는 감각입니다. 몸의 위치에 대한 정보를 받고 공 받기나 천장에서 컵을 꺼내는 것, 또는 어둠 속을 걷는 것과 같은 특정 작업을 수행하는 능력입니다."
                                );
                            }}
                            style={{
                                width: "14px",
                                marginBottom: "3px",
                                color: "#8fa2ff",
                                cursor: "pointer",
                            }}
                        />
                    </Text>
                    <Input
                        value={goyu}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setGoyu(Number(e.target.value));
                        }}
                        type="range"
                        id="고유수용성감각"
                        name="고유수용성감각"
                        min="0"
                        max="100"
                    />
                </InputWrap>
            </Container>
        </>
    );
};

export default SetUserSense;

const Container = tw.div`
flex flex-col w-full
`;

const TextArea = tw.div`
flex w-full justify-end mt-2
`;

const TextWrap = tw.div`
flex w-3/5 sm:w-1/2 justify-between mr-6
`;
const InputWrap = tw.div`
flex w-full justify-end items-center mb-4
relative
`;

const Input = tw.input`
w-3/5 sm:w-1/2 mr-6
`;

const Text = tw.h3`
absolute left-[5%] font-semibold text-[14px]
`;

const Span = tw.div`
text-xs font-semibold
`;
