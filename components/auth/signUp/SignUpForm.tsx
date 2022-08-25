import React, { useState, useEffect, useCallback } from "react";
import SetUserEmail from "./SetUserEmail";
import SetUserName from "./SetUserName";
import SetUserInfo from "./SetUserInfo";
import SetUserArea from "./SetUserArea";
import tw from "tailwind-styled-components";

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [nickName, setnickName] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [pwdIsValid, setPwdIsValid] = useState(false);
    const [nickNameIsValid, setNickNameIsValid] = useState(false);
    const [si, setSi] = useState("-선택-");
    const [gu, setGu] = useState("-선택-");
    const [agreed, setAgreed] = useState(false);
    const [type, setType] = useState("장애인");

    const checkAllValid = useCallback(() => {
        return (
            emailIsValid &&
            pwdIsValid &&
            nickNameIsValid &&
            si != "-선택-" &&
            gu != "-선택-" &&
            agreed &&
            type
        );
    }, [emailIsValid, pwdIsValid, nickNameIsValid, si, gu, agreed, type]);

    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (!checkAllValid()) {
            return;
        } //회원가입 로직 짜야함
    };

    useEffect(() => {
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
                    si={si}
                    setSi={setSi}
                    gu={gu}
                    setGu={setGu}
                    agreed={agreed}
                    setAgreed={setAgreed}
                />
                <SetUserInfo type={type} setType={setType} />
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
