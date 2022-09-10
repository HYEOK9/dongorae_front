import React from "react";
//components
import { setFilterOption } from "../../store/filterSlice";
import { useDispatch } from "react-redux";
//redux
import tw from "tailwind-styled-components";
import { useTheme } from "../context/Theme";

const DropDown = () => {
    const dispatch = useDispatch();
    const { themeColorset } = useTheme();

    return (
        <>
            <Ul
                style={{
                    backgroundColor: themeColorset.bgColor,
                    color: themeColorset.textColor,
                }}
            >
                <Li
                    onClick={() => {
                        dispatch(setFilterOption("전체"));
                    }}
                >
                    전체
                </Li>
                <Li
                    onClick={() => {
                        dispatch(setFilterOption("맞춤게시물"));
                    }}
                >
                    맞춤게시물
                </Li>
                <Li
                    onClick={() => {
                        dispatch(setFilterOption("필터"));
                    }}
                >
                    필터
                </Li>
            </Ul>
        </>
    );
};

export default DropDown;

const Ul = tw.ul`
flex absolute flex-col w-full top-[120%] rounded-lg
`;

const Li = tw.li`
flex justify-center items-center py-2 text-sm hover:bg-[rgba(0,0,0,0.1)] first:rounded-t-lg last:rounded-b-lg overflow-hidden
`;
