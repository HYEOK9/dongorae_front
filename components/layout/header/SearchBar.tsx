import tw from "tailwind-styled-components";
import React, { useState, useEffect } from "react";
import Search from "/public/HeaderImg/search.svg";

const SearchBar = () => {
    const [value, setValue] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

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
                    ></Input>
                    <Label htmlFor="search">
                        <Search width={20} />
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
px-12
py-2
rounded-3xl
outline-none
bg-[#f1f1f1]
focus:placeholder-transparent
`;

const Label = tw.label`
absolute
left-4
`;
