import React from "react";
import tw from "tailwind-styled-components";

interface propType {
    setType: React.Dispatch<React.SetStateAction<string>>;
}
const SetUserType = ({ setType }: propType) => {
    return (
        <>
            <Container>
                <input
                    value="장애인"
                    type="radio"
                    name="type"
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                    defaultChecked
                />
                장애인
                <input
                    value="학부모"
                    type="radio"
                    name="type"
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                />
                학부모
                <input
                    value="교사"
                    type="radio"
                    name="type"
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                />
                교사
                <input
                    value="기타"
                    type="radio"
                    name="type"
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                />
                기타
            </Container>
        </>
    );
};

export default React.memo(SetUserType);

const Container = tw.div`
flex justify-between items-center w-[75%] mb-4
`;
