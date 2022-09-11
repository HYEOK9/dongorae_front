import React, { useEffect, useCallback, useState } from "react";
import tw from "tailwind-styled-components";

interface propType {
    username: string;
    nickname: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setNickname: React.Dispatch<React.SetStateAction<string>>;
    nickNameIsValid: boolean;
    setNickNameIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetUserName = ({
    username,
    nickname,
    setUsername,
    setNickname,
    nickNameIsValid,
    setNickNameIsValid,
}: propType) => {
    const [nickNameStarted, setNickNameStarted] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (event.target.id == "name") {
            setUsername(value);
        } else {
            setNickNameStarted(true);
            setNickname(value);
        }
    };

    const checkNickNameIsValid = useCallback(() => {
        2 <= nickname.length && nickname.length <= 6
            ? setNickNameIsValid(true)
            : setNickNameIsValid(false);
    }, [nickname, setNickNameIsValid]);

    useEffect(() => {
        checkNickNameIsValid();
    }, [nickname]);

    return (
        <>
            <Container>
                <InputWrap>
                    <TextWrap>
                        <Text>이름*</Text>
                    </TextWrap>
                    <Input
                        type="text"
                        id="name"
                        value={username}
                        onChange={onChange}
                        autoComplete="off"
                        required
                        placeholder="예) 김철수"
                    ></Input>
                </InputWrap>
                <InputWrap>
                    <TextWrap>
                        <Text>닉네임*</Text>
                        {nickNameStarted && !nickNameIsValid && (
                            <WarnInfo>2~8자</WarnInfo>
                        )}
                    </TextWrap>
                    <Input
                        type="text"
                        id="nickName"
                        value={nickname}
                        onChange={onChange}
                        autoComplete="off"
                        required
                        placeholder="2~8자"
                    ></Input>
                </InputWrap>
            </Container>
        </>
    );
};

export default React.memo(SetUserName);

const Container = tw.div`
flex justify-around w-full
`;

const InputWrap = tw.div`
flex flex-col items-center relative w-2/5 mb-8
`;

const Input = tw.input`
peer w-4/5 h-12 text-base border-b border-b-solid border-b-[#c9c9c9] mb-1 focus:outline-none focus:border-b-[#366C95] focus:border-b-[1.5px] valid:outline-none valid:border-b-[#366C95] valid:border-b-[1.5px] placeholder-gray-400 placeholder:font-light focus:placeholder-transparent
`;

const TextWrap = tw.div`
flex justify-between w-4/5
`;

const Text = tw.h3`
font-semibold text-[13px]
`;

const WarnInfo = tw.span`
text-[11px] text-red-500
`;
