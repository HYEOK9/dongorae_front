import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthed, setUser } from "../../store/authSlice";
import { RootState } from "../../store";
import axios from "axios";

const useStayLogin = () => {
    const [userId, setUserId] = useState<number>();
    const [isFetcing, setIsFetching] = useState<boolean>(true);
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);
    const user = authState.user;
    console.log(user, authState.isAuthed);

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            dispatch(setIsAuthed(false));
            dispatch(setUser(null));
            return;
        }
        if (authState.isAuthed) {
            setIsFetching(false);
            return;
        }

        dispatch(setIsAuthed(true));
        const userId = Number(localStorage.getItem("userId"));
        (async () => {
            await axios.get(`/api/user/${userId}`).then((res) => {
                dispatch(setUser(res.data.result));
                setUserId(userId);
                setIsFetching(false);
            });
        })();
    }, [userId]);

    return { user, isFetcing };
};

export default useStayLogin;
