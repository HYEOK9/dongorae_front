import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Logo from "./Logo";
import SearchBar from "./Search";
import NavBar from "./NavBar";
import MobileSearch from "./MobileSearch";
import Goback from "/public/HeaderImg/goback.svg";
import { useTheme } from "../../context/Theme";

const Header = () => {
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const {themeColorset} = useTheme();

    return (
        <>
            <HeaderContainer style={{backgroundColor: themeColorset.bgColor}}>
                {!showMobileSearch ? (
                    <>
                        <Logo />
                        <SearchBar />
                        <NavBar setShowMobileSearch={setShowMobileSearch} />
                    </>
                ) : (
                    <>
                        <Goback
                            width={30}
                            style={{
                                cursor: "pointer",
                                position: "absolute",
                                "z-index": "100",
                                left: "20px",
                                top: "29%",
                            }}
                            onClick={() => {
                                setShowMobileSearch(false);
                            }}
                        />
                        <MobileSearch />
                    </>
                )}
            </HeaderContainer>
        </>
    );
};

export default Header;

const HeaderContainer = tw.div`
flex
relative
justify-around
items-center
fixed
w-screen
h-[10vh]
shadow-sm
border-b-[1.5px]
border-gray-300
`;
