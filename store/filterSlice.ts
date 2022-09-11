import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface filterState {
    option: "전체" | "맞춤게시물" | "필터";
    senseData: number[] | null;
}
const initialState: filterState = {
    option: "전체",
    senseData: null,
};

const filterSlice = createSlice({
    name: "searchfilter",
    initialState,
    reducers: {
        setFilterOption: (
            state: filterState,
            action: PayloadAction<"전체" | "맞춤게시물" | "필터">
        ) => {
            state.option = action.payload;
        },
        setSenseData: (
            state: filterState,
            action: PayloadAction<number[] | null>
        ) => {
            state.senseData = action.payload;
        },
    },
});

export const { setFilterOption, setSenseData } = filterSlice.actions;
export default filterSlice;
