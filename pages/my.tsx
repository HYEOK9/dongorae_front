import { useState, useEffect } from "react";
import UserSenseInfo from "../components/page/my/userSense";
//hooks
import useStayLogin from "../util/hooks/useStayLogin";
//style
import tw from "tailwind-styled-components";
import { useTheme } from "../components/context/Theme";
import UserSvg from "/public/user.svg";

const My = () => {
    const { user, isFetcing } = useStayLogin();
    console.log(user);
    const { themeColorset } = useTheme();
    const userSense = user.userSense;
    return (
        <>
            <MypageContainer>
                {!isFetcing ? (
                    <MypageArea
                        style={{ backgroundColor: themeColorset.bgColor }}
                    >
                        <SelectArea>
                            <Title>Profile</Title>
                        </SelectArea>
                        <InfoArea>
                            <UserSvg
                                width={100}
                                height={100}
                                fill={themeColorset.pointColor}
                                style={{ margin: "10px" }}
                            />
                            {user.nickname}
                        </InfoArea>
                        <InfoArea>
                            <Text>이메일</Text>
                            <Text>{user.email}</Text>
                        </InfoArea>
                        <InfoArea>
                            <Text>이름</Text>
                            <Text>{user.username}</Text>
                        </InfoArea>
                        <SenseArea>
                            <UserSenseInfo
                                name="청각"
                                idx={0}
                                value={userSense.auditory}
                            />
                            <UserSenseInfo
                                name="시각"
                                idx={1}
                                value={userSense.visual}
                            />
                            <UserSenseInfo
                                name="촉각"
                                idx={2}
                                value={userSense.tactile}
                            />

                            <UserSenseInfo
                                name="미각/후각"
                                idx={3}
                                value={userSense.oral}
                            />
                            <UserSenseInfo
                                name="전정감각"
                                idx={4}
                                value={userSense.vestibular}
                            />
                            <UserSenseInfo
                                name="고유수용성감각"
                                idx={5}
                                value={userSense.proprioceptive}
                            />
                        </SenseArea>
                    </MypageArea>
                ) : (
                    <h1>Loading...</h1>
                )}
            </MypageContainer>
        </>
    );
};

export default My;

const MypageContainer = tw.section`
flex justify-center items-center w-full h-full
`;

const MypageArea = tw.div`
flex flex-col items-center w-4/5 h-auto
`;

const SelectArea = tw.div`
flex items-center w-[92%] py-4 border-b-[0.5px] border-solid
`;

const Title = tw.div`
ml-4 text-xl
`;

const InfoArea = tw.div`
flex items-center w-[92%] py-5 border-b-[0.5px] border-solid text-[1.65rem]
`;

const Text = tw.div`
flex w-1/3 ml-4 text-sm
`;

const SenseArea = tw.div`
flex flex-wrap justify-around items-center w-full mt-6
`;
