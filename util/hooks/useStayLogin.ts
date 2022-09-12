import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthed, setUser } from "../../store/authSlice";
import { RootState } from "../../store";
import axios from "axios";

const useStayLogin = () => {
    const [userId, setUserId] = useState<number>();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.authState.user);
    console.log(user);

    useEffect(() => {
        if (!localStorage.getItem("userId")) {
            dispatch(setIsAuthed(false));
            return;
        }
        const fetchUser = async () => {
            const userId = Number(localStorage.getItem("userId"));
            const res = await axios.get(`/api/user/${userId}`);
            dispatch(setIsAuthed(true));
            dispatch(setUser(res.data.result));
            setUserId(userId);
        };
        fetchUser();
    }, []);
    return userId;
};

export default useStayLogin;
