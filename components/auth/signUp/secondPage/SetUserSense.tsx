import React, { useState, useEffect } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import tw from "tailwind-styled-components";

interface propType {
    setSenseData: React.Dispatch<React.SetStateAction<number[] | null>>;
    // 좋지않은거 알지만 임의로 추가합니다 ..
    senseData: any;
    setSenseData2: React.Dispatch<React.SetStateAction<any>> | null;
}
const SetUserSense = ({ senseData, setSenseData2, setSenseData }: propType) => {
    const [sense_auditory, setSense_auditory] = useState(
        senseData?.sense_auditory || 50
    );
    const [sense_visual, setSense_visual] = useState(
        senseData?.sense_visual || 50
    );
    const [sense_tactile, setSense_tactile] = useState(
        senseData?.sense_tactile || 50
    );
    const [sense_oral, setSense_oral] = useState(senseData?.sense_oral || 50);
    const [sense_vestibular, setSense_vestibular] = useState(
        senseData?.sense_vestibular || 50
    );
    const [sense_proprioceptive, setSense_proprioceptive] = useState(
        senseData?.sense_proprioceptive || 50
    );

    useEffect(() => {
        if (setSenseData)
            setSenseData([
                sense_auditory,
                sense_visual,
                sense_tactile,
                sense_oral,
                sense_vestibular,
                sense_proprioceptive,
            ]);
        if (setSenseData2)
            setSenseData2({
                sense_auditory,
                sense_visual,
                sense_tactile,
                sense_oral,
                sense_vestibular,
                sense_proprioceptive,
            });
    }, [
        sense_auditory,
        sense_visual,
        sense_tactile,
        sense_oral,
        sense_vestibular,
        sense_proprioceptive,
    ]);

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
                        value={sense_auditory}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSense_auditory(Number(e.target.value));
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
                        value={sense_visual}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSense_visual(Number(e.target.value));
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
                        value={sense_tactile}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSense_tactile(Number(e.target.value));
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
                        value={sense_oral}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSense_oral(Number(e.target.value));
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
                        value={sense_vestibular}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSense_vestibular(Number(e.target.value));
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
                        value={sense_proprioceptive}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSense_proprioceptive(Number(e.target.value));
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
