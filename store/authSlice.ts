import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
    userId: number;
    email: string;
    password: string;
    username: string;
    nickname: string;
    city: string;
    county: string;
    type: string;
    sense_auditory: number;
    sense_oral: number;
    sense_proprioceptive: number;
    sense_tactile: number;
    sense_vestibular: number;
    sense_visual: number;
}
export interface authState {
    isAuthed: boolean;
    user: userState;
}

const initialState: authState = {
    isAuthed: false,
    user: {
        userId: -1,
        email: "",
        password: "",
        username: "",
        nickname: "",
        city: "",
        county: "",
        type: "",
        sense_auditory: -1,
        sense_oral: -1,
        sense_proprioceptive: -1,
        sense_tactile: -1,
        sense_vestibular: -1,
        sense_visual: -1,
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
