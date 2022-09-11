import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
//components
import SetUserEmail from "./firstPage/SetUserEmail";
import SetUserName from "./firstPage/SetUserName";
import SetUserArea from "./firstPage/SetUserArea";
import SetUserType from "./secondPage/SetUserType";
import SetUserBirth from "./secondPage/SetUserBirth";
import SetUserSense from "./secondPage/SetUserSense";
//style
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import tw from "tailwind-styled-components";
import { BtnForSignIn } from "../../styled/Buttons";

const SignUpForm = () => {
    //첫페이지 states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [nickNameIsValid, setNickNameIsValid] = useState(false);
    const [birthDayIsValid, setBirthDayIsValid] = useState(false);
    const [city, setCity] = useState("-선택-");
    const [county, setCounty] = useState("-선택-");

    //두번째페이지 states
    const [secondPage, setSecondPage] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [birthDay, setBirthDay] = useState("");
    const [type, setType] = useState("disabled");
    const [checkSenseData, setCheckSenseData] = useState(false);
    const [senseData, setSenseData] = useState<number[] | null>(null);
    const router = useRouter();
    const checkFirstPageIsValid = () => {
        return (
            emailIsValid &&
            passwordIsValid &&
            nickNameIsValid &&
            city != "-선택-" &&
            county != "-선택-" &&
            agreed
        );
    };

    const checkSecondPageIsValid = () => {
        return birthDayIsValid;
    };

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (checkFirstPageIsValid() && checkSecondPageIsValid()) {
            //로직짜야함
        }
    };

    useEffect(() => {
        !checkSenseData && setSenseData(null);
    }, [checkSenseData]);

    return (
        <FormContainer>
            <SignUpText>회원가입</SignUpText>
            {!secondPage ? (
                <>
                    <SetUserEmail
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        emailIsValid={emailIsValid}
                        setEmailIsValid={setEmailIsValid}
                        passwordIsValid={passwordIsValid}
                        setPasswordIsValid={setPasswordIsValid}
                    />
                    <SetUserName
                        username={username}
                        setUsername={setUsername}
                        nickname={nickname}
                        setNickname={setNickname}
                        nickNameIsValid={nickNameIsValid}
                        setNickNameIsValid={setNickNameIsValid}
                    />
                    <SetUserArea
                        city={city}
                        setCity={setCity}
                        county={county}
                        setCounty={setCounty}
                        agreed={agreed}
                        setAgreed={setAgreed}
                    />
                    <NextBtn
                        type="button"
                        onClick={() => {
                            checkFirstPageIsValid() && setSecondPage(true);
                        }}
                    >
                        다음
                    </NextBtn>
                </>
            ) : (
                <>
                    <ArrowWrap>
                        <ArrowBackIcon
                            onClick={() => {
                                setSecondPage(false);
                                setCheckSenseData(false);
                            }}
                            fontSize="large"
                            style={{ cursor: "pointer" }}
                        />
                    </ArrowWrap>
                    <SetUserBirth
                        setBirthDay={setBirthDay}
                        birthDayIsValid={birthDayIsValid}
                        setBirthDayIsValid={setBirthDayIsValid}
                    />
                    <SetUserType setType={setType} />
                    <CheckSenseData>
                        감각정보 설정 (선택)
                        <input
                            type="checkbox"
                            onClick={() => {
                                setCheckSenseData((prev) => !prev);
                            }}
                            style={{ marginLeft: "10px" }}
                        />
                    </CheckSenseData>
                    <Span>*감각정보를 바탕으로 게시물을 추천합니다.*</Span>
                    {checkSenseData && (
                        <SetUserSense setSenseData={setSenseData} />
                    )}
                    <JoinBtn type="submit" onClick={onSubmit}>
                        가입하기
                    </JoinBtn>
                </>
            )}
        </FormContainer>
    );
};
export default SignUpForm;

const FormContainer = tw.form`
flex relative flex-col items-center w-full h-full text-[#366C95]
`;

const SignUpText = tw.h1`
mt-[50px] mb-[30px] text-3xl font-semibold
`;

const NextBtn = tw(BtnForSignIn)`
absolute top-[85%] bg-neutral-200 text-white hover:bg-[#366C95]
`;

const ArrowWrap = tw.div`
flex absolute w-[95%] mt-[50px] mb-[40px]
`;

const CheckSenseData = tw.div`
flex justify-center items-center w-4/5 h-[35px]
`;

const Span = tw.span`
text-[8px]
`;
const JoinBtn = tw(BtnForSignIn)`
absolute top-[85%] bg-neutral-200 text-white hover:bg-[#366C95]
`;
