import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface curLocationState {
    location: { lat: number; lng: number } | null;
    error: boolean;
}
const initialState: curLocationState = {
    location: null,
    error: true,
};

const curLocationSlice = createSlice({
    name: "curLocation",
    initialState,
    reducers: {
        setLocation: (
            state: curLocationState,
            action: PayloadAction<{ lat: number; lng: number } | null>
        ) => {
            state.location = action.payload;
        },
        setError: (state: curLocationState, action: PayloadAction<boolean>) => {
            state.error = action.payload;
        },
    },
});

export const { setLocation, setError } = curLocationSlice.actions;
export default curLocationSlice;
