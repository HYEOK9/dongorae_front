import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface curLocationState {
    location: { lat: number; lng: number } | null;
    err: boolean;
    mounted: boolean;
}
const initialState: curLocationState = {
    location: null,
    err: true,
    mounted: false,
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
            state.err = action.payload;
        },
        setMounted: (
            state: curLocationState,
            action: PayloadAction<boolean>
        ) => {
            state.mounted = action.payload;
        },
    },
});

export const { setLocation, setError, setMounted } = curLocationSlice.actions;
export default curLocationSlice;
