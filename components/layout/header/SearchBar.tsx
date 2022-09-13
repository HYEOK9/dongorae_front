import tw from "tailwind-styled-components";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { setKeyword } from "../../../store/searchSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTheme } from "../../context/Theme";

const SearchBar = () => {
    const [value, setValue] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();
    const { themeColorset } = useTheme();

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
            <SearchBarWrap>
                <SearchInputWrap>
                    <Input
                        id="search"
                        value={value}
                        onChange={onChange}
                        autoComplete="off"
                        placeholder="search"
                        onKeyPress={handleKeyPress}
                        style={{
                            backgroundColor: themeColorset.baseColor,
                            color: themeColorset.textColor,
                        }}
                    ></Input>
                    <Label htmlFor="search">
                        <SearchIcon fontSize="medium" />
                    </Label>
                </SearchInputWrap>
            </SearchBarWrap>
        </>
    );
};

export default SearchBar;

const SearchBarWrap = tw.div`
sm:hidden
flex
w-1/2
h-auto
justify-center
`;

const SearchInputWrap = tw.div`
flex
justify-center
items-center
relative
w-2/3
h-full
`;

const Input = tw.input`
w-full
px-10
py-2
rounded-3xl
outline-none
focus:placeholder-transparent
`;

const Label = tw.label`
absolute
left-2
`;
