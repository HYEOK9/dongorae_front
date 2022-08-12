import tw from "tailwind-styled-components";
import Map from "/public/HeaderImg/map.svg";
import Profile from "/public/HeaderImg/profile.svg";
import BurgerBar from "/public/HeaderImg/burgerBar.svg";
import SearchImg from "/public/HeaderImg/search.svg";

const NavBar = () => {
    return (
        <>
            <NavBarWrap>
                <Nav>
                    <NavItemsSearch>
                        <SearchImg width={42} />
                    </NavItemsSearch>
                    <NavItems>
                        <Map width={47} />
                    </NavItems>
                    <NavItems>
                        <Profile width={47} />
                    </NavItems>
                    <NavItems>
                        <BurgerBar width={47} />
                    </NavItems>
                </Nav>
            </NavBarWrap>
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
xs:block
`;
