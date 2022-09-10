import React, {
    MouseEventHandler,
    RefObject,
    useEffect,
    useState,
} from "react";
//components
import DropDown from "../../modal/DropDown";
import SenseFilter from "./senseFilter";
import { useRef } from "react";
//redux
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
//style
import tw from "tailwind-styled-components";
import { useTheme } from "../../context/Theme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const searchFilter = () => {
    const element = useRef<HTMLDivElement>(null);
    const filterOption = useSelector(
        (state: RootState) => state.filterState.option
    );
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const { themeColorset } = useTheme();

    useEffect(() => {
        const closeDropDown = (e: MouseEvent) => {
            if (
                showDropDown &&
                element.current &&
                !element.current.contains(e.target as HTMLDivElement)
            )
                setShowDropDown(false);
        };
        window.addEventListener("click", closeDropDown);
        return () => {
            window.removeEventListener("click", closeDropDown);
        };
    });

    return (
        <>
            <FilterContainer>
                <FilterBtn
                    style={{
                        backgroundColor: themeColorset.bgColor,
                        color: themeColorset.textColor,
                        margin: "15px 15px 0 0",
                    }}
                    onClick={() => {
                        setShowDropDown((prev) => !prev);
                    }}
                    ref={element}
                >
                    <CurOption style={{ pointerEvents: "none" }}>
                        {filterOption}
                        {!showDropDown ? (
                            <ArrowDropDownIcon
                                style={{
                                    marginRight: "-12px",
                                }}
                            />
                        ) : (
                            <ArrowDropUpIcon
                                style={{
                                    marginRight: "-12px",
                                }}
                            />
                        )}
                    </CurOption>
                    {showDropDown && <DropDown />}
                </FilterBtn>
                {filterOption === "필터" && <SenseFilter />}
            </FilterContainer>
        </>
    );
};

export default React.memo(searchFilter);

const FilterContainer = tw.section`
flex flex-col items-end w-full
`;

const CurOption = tw.div`
flex w-full justify-center items-center text-sm
`;

const FilterBtn = tw.div`
flex relative flex-col justify-end items-center w-24 py-2 border border-solid border-[#c7c7c7] shadow-lg rounded-lg mt-8 cursor-pointer
`;
