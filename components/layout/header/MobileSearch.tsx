import React, { useState, useEffect } from "react";
import { setKeyword } from "../../../store/searchSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import SearchIcon from "@mui/icons-material/Search";

const MobileSearch = () => {
    const [value, setValue] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key == "Enter" &&
            router.pathname == "/searchmap" &&
            value.trim() != "" &&
            dispatch(setKeyword(value));
    };

    useEffect(() => {
        setValue("");
    }, [router.pathname]);

    return (
        <>
            <MobileSearchWrap>
                <Label htmlFor="search">
                    <SearchIcon fontSize="small" />
                </Label>
                <MobileSearchInput
                    id="search"
                    value={value}
                    onChange={onChange}
                    autoComplete="off"
                    placeholder="search"
                    onKeyPress={handleKeyPress}
                ></MobileSearchInput>
            </MobileSearchWrap>
        </>
    );
};
export default MobileSearch;

const MobileSearchWrap = tw.div`
flex
relative
justify-center
h-3/5
`;

const MobileSearchInput = tw.input`
px-10
w-[180px]
h-full
bg-[#f1f1f1]
rounded-2xl
outline-none
`;

const Label = tw.label`
absolute
top-[30%]
left-[5%]
`;
