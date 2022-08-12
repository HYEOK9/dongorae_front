import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import tw from "tailwind-styled-components";

const SignInForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

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
            /[a-zA-Z]/.test(pwd)
        );
    };

    const logIn = async (email: string, pwd: string) => {
        try {
            const res = await axios.post(
                "API 작성",
                { email, pwd },
                {
                    withCredentials: true,
                }
            );
            const { accessToken } = res?.data;
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${accessToken}`;
        } catch (err) {
            console.log(err);
        }
    };
    const onSubmit = (event: React.SyntheticEvent) => {
        //로그인 로직 짜야함
        event.preventDefault();
        if (!checkIsValid()) {
            alert("올바르지 않은 형식입니다.");
            return;
        }
        logIn(email, pwd);
        router.replace("/");
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
                        id="pwd"
                        value={pwd}
                        onChange={onChange}
                        autoComplete="off"
                        required
                    ></Input>
                    <Label htmlFor="pwd">비밀번호</Label>
                </InputWrap>
                <JoinInTextWrap>
                    <Link href="join">
                        <span style={{ cursor: "pointer" }}>회원가입</span>
                    </Link>
                </JoinInTextWrap>
                <SigninBtn type="submit">로그인</SigninBtn>
            </Form>
        </>
    );
};
export default SignInForm;

const Form = tw.form`
flex flex-col items-center w-full mb-[50px]
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

const SigninBtn = tw.button`
flex justify-center items-center relative w-4/5 h-[60px] bg-neutral-200 rounded-2xl mt-2 text-white font-medium cursor-pointer hover:bg-[#366C95] hover:text-white
`;
