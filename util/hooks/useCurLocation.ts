import { useEffect } from "react";
import { setLocation, setError } from "../../store/curLocationSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

//[유저의 현재 위치, 에러여부] 반환
const useCurLocation = () => {
    const location = useSelector(
        (state: RootState) => state.curLocationState.location
    );
    const locError = useSelector(
        (state: RootState) => state.curLocationState.error
    );
    const dispatch = useDispatch();

    const successHandler = (position: any) => {
        const { latitude, longitude } = position.coords;
        dispatch(setLocation({ lat: latitude, lng: longitude }));
        dispatch(setError(false));
    };

    const errorHandler = () => {
        dispatch(setError(true));
    };

    useEffect(() => {
        if (location) return;
        const { geolocation } = navigator;
        if (!geolocation) {
            dispatch(setError(true));
            return;
        }
        geolocation.getCurrentPosition(successHandler, errorHandler, {
            timeout: 5000,
        });
    }, [location, locError]);

    return { location, locError };
};

export default useCurLocation;
