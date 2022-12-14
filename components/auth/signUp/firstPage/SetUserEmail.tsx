import React, { useState, useEffect, useCallback } from "react";
import tw from "tailwind-styled-components";

interface propType {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    emailIsValid: boolean;
    setEmailIsValid: React.Dispatch<React.SetStateAction<boolean>>;
    passwordIsValid: boolean;
    setPasswordIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetUserEmail = ({
    email,
    password,
    setEmail,
    setPassword,
    emailIsValid,
    passwordIsValid,
    setEmailIsValid,
    setPasswordIsValid,
}: propType) => {
    const [emailStarted, setEmailStarted] = useState(false);
    const [pwdStarted, setPwdStarted] = useState(false);

    const checkEmailIsValid = useCallback(() => {
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            ? setEmailIsValid(true)
            : setEmailIsValid(false);
    }, [email, setEmailIsValid]);

    const checkPwdIsValid = useCallback(() => {
        password.length >= 6 &&
        password.length <= 16 &&
        /[0-9]/.test(password) &&
        /[a-zA-Z]/.test(password)
            ? setPasswordIsValid(true)
            : setPasswordIsValid(false);
    }, [password, setPasswordIsValid]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (event.target.id == "email") {
            setEmail(value);
            setEmailStarted(true);
        } else {
            setPassword(value);
            setPwdStarted(true);
        }
    };

    useEffect(() => {
        checkEmailIsValid();
        checkPwdIsValid();
    }, [checkEmailIsValid, checkPwdIsValid]);

    return (
        <>
            <TextWrap>
                <Text>이메일*</Text>
                {emailStarted && !emailIsValid && (
                    <WarnInfo>올바른 이메일을 입력해주세요</WarnInfo>
                )}
            </TextWrap>
            <InputWrap>
                <Input
                    type="text"
                    id="email"
                    value={email}
                    onChange={onChange}
                    autoComplete="off"
                    required
                    placeholder="예) example@example.com"
                ></Input>
            </InputWrap>
            <TextWrap>
                <Text>비밀번호*</Text>
                {pwdStarted && !passwordIsValid && (
                    <WarnInfo>영문, 숫자 조합 6~16자</WarnInfo>
                )}
            </TextWrap>
            <InputWrap>
                <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={onChange}
                    autoComplete="off"
                    required
                    placeholder="영문, 숫자 조합 6~16자"
                ></Input>
            </InputWrap>
        </>
    );
};

export default React.memo(SetUserEmail);

const TextWrap = tw.div`
flex justify-between w-4/5
`;

const Text = tw.h3`
font-semibold text-[13px]
`;

const InputWrap = tw.div`
flex justify-center relative w-full mb-10
`;

const Input = tw.input`
w-4/5 h-12 text-base border-b border-b-solid border-b-[#c9c9c9] focus:outline-none focus:border-b-[#366C95] focus:border-b-[1.5px] focus:placeholder-transparent valid:outline-none valid:border-b-[#366C95] valid:border-b-[1.5px] placeholder-gray-400 placeholder:font-light
`;

const WarnInfo = tw.span`
text-[10px] text-red-500
`;
