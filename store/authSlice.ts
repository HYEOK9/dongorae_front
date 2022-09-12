import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
    // userId: number;
    email: string;
    // password: string;
    username: string;
    nickname: string;
    type: string;
    birthday: string;
    // city: string;
    // county: string;
    userSense: {
        id: number;
        auditory: number;
        visual: number;
        vestibular: number;
        tactile: number;
        proprioceptive: number;
        oral: number;
    };
}
export interface authState {
    isAuthed: boolean;
    user: userState;
}

const initialState: authState = {
    isAuthed: false,
    user: {
        // userId: -1,
        email: "",
        // password: "",
        username: "",
        nickname: "",
        type: "",
        birthday: "",
        // city: "",
        // county: "",
        userSense: {
            id: -1,
            auditory: -1,
            oral: -1,
            proprioceptive: -1,
            tactile: -1,
            vestibular: -1,
            visual: -1,
        },
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuthed: (state: authState, action: PayloadAction<boolean>) => {
            state.isAuthed = action.payload;
        },
        setUser: (state: authState, action: PayloadAction<userState>) => {
            state.user = action.payload;
        },
    },
});

export const { setIsAuthed, setUser } = authSlice.actions;
export default authSlice;
