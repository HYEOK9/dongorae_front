import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useSelector } from "react-redux";
import Link from "next/link";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";

// Components
import { RootState } from "../../../store/index";
import SideBar from "../../modal/SideBar";
import Portal from "../../../HOC/Portal";
import ThemeMode from "./ThemeMode";

interface propType {
    setShowMobileSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = (props: propType) => {
    const [showSideBar, setShowSidebar] = useState(false);
    const auth = useSelector((state: RootState) => state.authState);

    return (
        <>
            <NavBarWrap>
                <Nav>
                    <NavItems>
                        <ThemeMode />
                    </NavItems>
                    <NavItemsSearch
                        onClick={() => {
                            props.setShowMobileSearch((prev) => !prev);
                        }}
                    >
                        <SearchIcon fontSize="large" />
                    </NavItemsSearch>
                    <NavItems>
                        <Link href="/searchmap">
                            <a>
                                <LocationOnIcon fontSize={"large"} />
                            </a>
                        </Link>
                    </NavItems>
                    <NavItems>
                        <Link href={auth.isAuthed ? "/my" : "/signin"}>
                            <a>
                                <AccountCircleIcon fontSize={"large"} />
                            </a>
                        </Link>
                    </NavItems>
                    <NavItems>
                        <MenuIcon
                            fontSize={"large"}
                            onClick={() => {
                                setShowSidebar((prev) => !prev);
                            }}
                        />
                    </NavItems>
                </Nav>
            </NavBarWrap>
            <Portal>
                <SideBar showSideBar={showSideBar} />
            </Portal>
        </>
    );
};

export default NavBar;

const NavBarWrap = tw.div`
flex
justify-end
items-center
w-1/4
h-full
`;

const Nav = tw.nav`
flex
justify-between
items-center
h-full
sm:-mr-10
`;

const NavItems = tw.li`
cursor-pointer
hover:scale-105
mr-4
sm:mr-2
`;

const NavItemsSearch = tw(NavItems)`
hidden
sm:block
`;
