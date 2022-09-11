import { useEffect } from "react";
import useStayLogin from "../util/hooks/useStayLogin";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import { useTheme } from "../components/context/Theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserSvg from "/public/user.svg";
const My = () => {
    const user = useSelector((state: RootState) => state.authState.user);
    const userId = useStayLogin();
    const { themeColorset } = useTheme();
    console.log(user);
    return (
        <>
            <MypageContainer>
                <MypageArea style={{ backgroundColor: themeColorset.bgColor }}>
                    <SelectArea>
                        <Title>Profile</Title>
                    </SelectArea>
                    <InfoArea>
                        <UserSvg
                            width={100}
                            height={100}
                            fill={themeColorset.pointColor}
                            style={{ margin: "20px" }}
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
                </MypageArea>
            </MypageContainer>
        </>
    );
};

export default My;

const MypageContainer = tw.section`
flex justify-center items-center w-full h-full
`;

const MypageArea = tw.div`
flex flex-col items-center w-1/2 h-4/5
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
flex w-1/3 ml-4 text-base
`;

const TextDiv = tw.div`
flex flex-col w-full
`;
