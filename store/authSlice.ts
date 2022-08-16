import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authState {
    isAuthed: boolean;
}
const initialState: authState = {
    isAuthed: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuthed: (state: authState, action: PayloadAction<boolean>) => {
            state.isAuthed = action.payload;
        },
    },
});

export const { setIsAuthed } = authSlice.actions;
export default authSlice;
