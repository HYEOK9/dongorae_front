import tw from "tailwind-styled-components";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";

const Header = () => {
    return (
        <>
            <HeaderContainer>
                <Logo />
                <SearchBar />
                <NavBar />
            </HeaderContainer>
        </>
    );
};

export default Header;

const HeaderContainer = tw.div`
flex
justify-around
items-center
sticky
w-screen
h-[10vh]
bg-white
shadow-sm
border-b-[1.5px]
border-gray-300
`;
