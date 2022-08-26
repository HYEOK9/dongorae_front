import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLocation, setError, setMounted } from "../store/curLocationSlice";
import useCurLocation from "../util/hooks/useCurLocation";
import tw from "tailwind-styled-components/dist/tailwind";

const Home: NextPage = () => {
    const dispatch = useDispatch();
    const Mounted = useSelector(
        (state: RootState) => state.curLocation.mounted
    );
    const { location, error } = useCurLocation();

    useEffect(() => {
        if (!Mounted) {
            dispatch(setLocation(location));
            dispatch(setError(error));
        }
        location && dispatch(setMounted(true));
    }, [location]);

    return (
        <>
            <HomeItemContainer>
                <h1>Contents Here</h1>
            </HomeItemContainer>
        </>
    );
};

export default Home;

const HomeItemContainer = tw.div`
flex
flex-col
items-center
w-screen
pt-[10vh]
`;
