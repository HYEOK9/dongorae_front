import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface searchState {
    keyword: string;
}
const initialState: searchState = {
    keyword: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setKeyword: (state: searchState, action: PayloadAction<string>) => {
            state.keyword = action.payload;
        },
    },
});

export const { setKeyword } = searchSlice.actions;
export default searchSlice;
