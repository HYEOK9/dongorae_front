import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import { BtnForSignIn } from "../../styled/Buttons";

const SignInForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (event.target.id == "email") setEmail(value);
        else setPassword(value);
    };

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    return (
        <>
            <Form onSubmit={onSubmit}>
                <LoginText>LOGIN</LoginText>
                <InputWrap>
                    <Input
                        type="text"
                        id="email"
                        value={email}
                        onChange={onChange}
                        autoComplete="off"
                        required
                    ></Input>
                    <Label htmlFor="email">이메일</Label>
                </InputWrap>
                <InputWrap>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={onChange}
                        autoComplete="off"
                        required
                    ></Input>
                    <Label htmlFor="password">비밀번호</Label>
                </InputWrap>
                <JoinInTextWrap>
                    <Link href="join">
                        <span style={{ cursor: "pointer" }}>회원가입</span>
                    </Link>
                </JoinInTextWrap>
                <SignInBtn type="submit">로그인</SignInBtn>
            </Form>
        </>
    );
};
export default SignInForm;

const Form = tw.form`
flex flex-col items-center w-full
`;

const LoginText = tw.h1`
mt-[50px] mb-[80px] text-3xl font-semibold
`;

const InputWrap = tw.div`
flex justify-center relative w-full mb-12
`;

const Input = tw.input`
peer w-4/5 h-12 text-base border-b border-b-solid border-b-[#c9c9c9] focus:outline-none focus:border-b-[#366C95] focus:border-b-[1.5px] valid:outline-none valid:border-b-[#366C95] valid:border-b-[1.5px]
`;

const Label = tw.label`
absolute mt-3 left-[11%] text-sm text-[#c9c9c9] hover:cursor-auto peer-focus:text-[#366C95] peer-focus:text-xs peer-focus:animate-labelUp peer-valid:text-[#366C95] peer-valid:text-xs peer-valid:animate-labelUp
`;

const JoinInTextWrap = tw.div`
flex justify-end w-4/5 h-auto -mt-8 mb-8 text-sm
`;

const SignInBtn = tw(BtnForSignIn)`
bg-neutral-200 text-white hover:bg-[#366C95]
`;
