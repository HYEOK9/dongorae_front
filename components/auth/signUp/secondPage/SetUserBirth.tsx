import React, { useState, useEffect, useCallback } from "react";
import tw from "tailwind-styled-components";

interface propType {
    setBirthday: React.Dispatch<React.SetStateAction<string>>;
    birthdayIsValid: boolean;
    setBirthdayIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetUserBirth = ({
    setBirthday,
    birthdayIsValid,
    setBirthdayIsValid,
}: propType) => {
    const [year, setYear] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [day, setDay] = useState<string>("");
    const [inputStarted, setInputStarted] = useState(false);

    const checkBirthDayIsValid = () => {
        if (
            1900 <= Number(year) &&
            Number(year) <= 2022 &&
            1 <= Number(month) &&
            Number(month) <= 12 &&
            1 <= Number(day) &&
            Number(day) <= 31
        )
            setBirthdayIsValid(true);
        else setBirthdayIsValid(false);
    };
    useEffect(() => {
        checkBirthDayIsValid();
        birthdayIsValid &&
            setBirthday(
                `${year}${
                    Number(month) < 10 ? `0${Number(month)}` : Number(month)
                }${Number(day) < 10 ? `0${Number(day)}` : Number(day)}`
            );
    }, [checkBirthDayIsValid]);

    return (
        <>
            <Container>
                <TextWrap>
                    <Text>생년월일*</Text>
                    {!birthdayIsValid && inputStarted && (
                        <WarnInfo>올바른 생년월일을 입력해주세요</WarnInfo>
                    )}
                </TextWrap>
                <BirthInputWrap>
                    <BirthInput
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setYear(e.target.value);
                            setInputStarted(true);
                        }}
                        name="year"
                        value={year}
                        placeholder="YYYY"
                        maxLength="4"
                        autoComplete="off"
                    />
                    <Span>/</Span>
                    <BirthInput
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setMonth(e.target.value);
                            setInputStarted(true);
                        }}
                        name="month"
                        value={month}
                        placeholder="MM"
                        maxLength="2"
                        autoComplete="off"
                    />
                    <Span>/</Span>
                    <BirthInput
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setDay(e.target.value);
                            setInputStarted(true);
                        }}
                        name="day"
                        value={day}
                        placeholder="DD"
                        maxLength="2"
                        autoComplete="off"
                    />
                </BirthInputWrap>
            </Container>
        </>
    );
};

export default React.memo(SetUserBirth);

const Container = tw.div`
flex flex-col w-4/5 justify-center
`;

const TextWrap = tw.div`
flex justify-between
`;

const Text = tw.h3`
font-semibold text-[13px]
`;

const WarnInfo = tw.span`
text-[11px] text-red-500
`;

const BirthInputWrap = tw.div`
flex justify-around w-full h-auto mt-2 mb-6 border-[1px] border-solid border-[#c9c9c9]
`;

const BirthInput = tw.input`
w-4/5 p-3 text-center outline-none
`;

const Span = tw.span`
self-center text-[#c9c9c9]
`;
