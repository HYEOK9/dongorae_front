import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useTheme } from "../../context/Theme";

//icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//components
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import MobileSearch from "./MobileSearch";

const Header = () => {
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const { themeColorset } = useTheme();

    return (
        <>
            <HeaderContainer style={{ backgroundColor: themeColorset.bgColor }}>
                {!showMobileSearch ? (
                    <>
                        <Logo />
                        <SearchBar />
                        <NavBar setShowMobileSearch={setShowMobileSearch} />
                    </>
                ) : (
                    <>
                        <ArrowBackIcon
                            fontSize={"large"}
                            style={{
                                cursor: "pointer",
                                position: "absolute",
                                zIndex: "100",
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
text-black
`;
