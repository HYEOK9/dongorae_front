import {
    configureStore,
    combineReducers,
    AnyAction,
    CombinedState,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { Reducer } from "@reduxjs/toolkit";
import authSlice, { authState } from "./authSlice";
import searchSlice, { searchState } from "./searchSlice";
import curLocationSlice, { curLocationState } from "./curLocationSlice";

export interface RootState {
    authState: authState;
    searchState: searchState;
    curLocationState: curLocationState;
}

const RootReducer = (
    state: RootState,
    action: AnyAction
): CombinedState<RootState> => {
    if (action.type === HYDRATE) return { ...state, ...action.payload };
    const combinedReducer = combineReducers({
        authState: authSlice.reducer,
        searchState: searchSlice.reducer,
        curLocationState: curLocationSlice.reducer,
    });
    return combinedReducer(state, action);
};

const makeStore = () =>
    configureStore({
        reducer: RootReducer as Reducer<CombinedState<RootState>, AnyAction>,
    });

export const wrapper = createWrapper(makeStore);
