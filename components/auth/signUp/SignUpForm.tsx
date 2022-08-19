import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SetUserInfo from "./SetUserInfo";
import tw from "tailwind-styled-components";
import SetAreaInfo from "./SetAreaInfo";

const SignUpForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [nickName, setnickName] = useState("");
    const [siChecked, setSiChecked] = useState(false);
    const [guChecked, setGuChecked] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (event.target.id == "email") setEmail(value);
        else setPwd(value);
    };

    const checkIsValid = () => {
        return (
            email.trim() != "" &&
            email.includes("@") &&
            pwd.length >= 6 &&
            pwd.length <= 16 &&
            /[0-9]/.test(pwd) &&
            /[a-zA-Z]/.test(pwd) &&
            nickName.length >= 2 &&
            nickName.length <= 8
        );
    };

    const onSubmit = (event: React.SyntheticEvent) => {
        //회원가입 로직 짜야함
        event.preventDefault();
        if (!checkIsValid()) {
            alert("올바르지 않은 형식입니다.");
            return;
        }
        router.replace("/");
    };

    return (
        <>
            <FormContainer onSubmit={onSubmit}>
                <SignUpText>회원가입</SignUpText>
                <TextWrap>
                    <Text>이메일*</Text>
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
                </TextWrap>
                <InputWrap>
                    <Input
                        type="password"
                        id="pwd"
                        value={pwd}
                        onChange={onChange}
                        autoComplete="off"
                        required
                        placeholder="영문, 숫자 조합 6~16자"
                    ></Input>
                </InputWrap>
                <SetUserInfo
                    name={name}
                    setName={setName}
                    nickName={nickName}
                    setNickName={setnickName}
                />
                <SetAreaInfo
                    siChecked={siChecked}
                    setSiChecked={setSiChecked}
                    guChecked={guChecked}
                    setGuChecked={setGuChecked}
                    agreed={agreed}
                    setAgreed={setAgreed}
                />
                <JoinBtn type="submit">가입하기</JoinBtn>
            </FormContainer>
        </>
    );
};
export default SignUpForm;

const FormContainer = tw.form`
flex flex-col items-center w-full text-[#366C95]
`;

const SignUpText = tw.h1`
mt-[50px] mb-[40px] text-3xl font-semibold
`;

const TextWrap = tw.div`
flex w-4/5
`;

const Text = tw.h3`
font-semibold text-[13px]
`;

const InputWrap = tw.div`
flex justify-center relative w-full mb-8
`;

const Input = tw.input`
peer w-4/5 h-12 text-base border-b border-b-solid border-b-[#c9c9c9] focus:outline-none focus:border-b-[#366C95] focus:border-b-[1.5px] focus:placeholder-transparent valid:outline-none valid:border-b-[#366C95] valid:border-b-[1.5px] placeholder-gray-400 placeholder:font-light
`;

const JoinBtn = tw.button`
flex justify-center items-center relative w-4/5 h-[60px] bg-neutral-200 rounded-2xl mt-2 text-white font-medium cursor-pointer hover:bg-[#366C95]
`;
