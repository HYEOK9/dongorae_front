import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
    userId: number;
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
    user: userState | null;
}

const initialState: authState = {
    isAuthed: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuthed: (state: authState, action: PayloadAction<boolean>) => {
            state.isAuthed = action.payload;
        },
        setUser: (
            state: authState,
            action: PayloadAction<userState | null>
        ) => {
            state.user = action.payload;
        },
    },
});

export const { setIsAuthed, setUser } = authSlice.actions;
export default authSlice;
