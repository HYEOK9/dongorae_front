import { useState } from "react";
import tw from "tailwind-styled-components";
import Map from "/public/HeaderImg/map.svg";
import Profile from "/public/HeaderImg/profile.svg";
import BurgerBar from "/public/HeaderImg/burgerBar.svg";
import SearchImg from "/public/HeaderImg/search.svg";
import Portal from "../../../HOC/Portal";
import React from "react";
import SideBar from "../../modal/SideBar";
import Link from "next/link";
import { RootState } from "../../../store/index";
import { useSelector } from "react-redux";

interface propType {
    setShowMobileSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = (props: propType) => {
    const [showSideBar, setShowSidebar] = useState(false);
    const auth = useSelector((state: RootState) => state.auth);

    return (
        <>
            <NavBarWrap>
                <Nav>
                    <NavItemsSearch
                        onClick={() => {
                            props.setShowMobileSearch((prev) => !prev);
                        }}
                    >
                        <SearchImg width={37} />
                    </NavItemsSearch>
                    <NavItems>
                        <Link href="/searchmap">
                            <a>
                                <Map width={42} />
                            </a>
                        </Link>
                    </NavItems>
                    <NavItems>
                        <Link href={auth.isAuthed ? "/my" : "/signin"}>
                            <a>
                                <Profile width={42} />
                            </a>
                        </Link>
                    </NavItems>
                    <NavItems>
                        <BurgerBar
                            width={42}
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
w-52
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
