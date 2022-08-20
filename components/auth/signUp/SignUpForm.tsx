import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SetUserEmail from "./SetUserEmail";
import SetUserName from "./SetUserName";
import SetUserArea from "./SetUserArea";
import tw from "tailwind-styled-components";

const SignUpForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [nickName, setnickName] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [pwdIsValid, setPwdIsValid] = useState(false);
    const [nickNameIsValid, setNickNameIsValid] = useState(false);
    const [siChecked, setSiChecked] = useState(false);
    const [guChecked, setGuChecked] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const checkAllValid = useCallback(() => {
        return (
            emailIsValid &&
            pwdIsValid &&
            nickNameIsValid &&
            siChecked &&
            guChecked &&
            agreed
        );
    }, [emailIsValid, pwdIsValid, nickNameIsValid, siChecked, guChecked]);

    const onSubmit = (event: React.SyntheticEvent) => {
        //회원가입 로직 짜야함
        event.preventDefault();
        if (!checkAllValid()) {
            return;
        }
        router.replace("/");
    };

    useEffect(() => {
        emailIsValid && console.log("email ok");
        pwdIsValid && console.log("pwd ok");
        nickNameIsValid && console.log("nickname ok");
        siChecked && console.log("si checked");
        guChecked && console.log("gu checked");
        agreed && console.log("agreed");
        checkAllValid();
    }, [checkAllValid]);

    return (
        <>
            <FormContainer onSubmit={onSubmit}>
                <SetUserEmail
                    email={email}
                    setEmail={setEmail}
                    pwd={pwd}
                    setPwd={setPwd}
                    emailIsValid={emailIsValid}
                    setEmailIsValid={setEmailIsValid}
                    pwdIsValid={pwdIsValid}
                    setPwdIsValid={setPwdIsValid}
                />
                <SetUserName
                    name={name}
                    setName={setName}
                    nickName={nickName}
                    setNickName={setnickName}
                    nickNameIsValid={nickNameIsValid}
                    setNickNameIsValid={setNickNameIsValid}
                />
                <SetUserArea
                    siChecked={siChecked}
                    setSiChecked={setSiChecked}
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

const JoinBtn = tw.button`
flex justify-center items-center relative w-4/5 h-[60px] bg-neutral-200 rounded-2xl mt-2 text-white font-medium cursor-pointer hover:bg-[#366C95]
`;
