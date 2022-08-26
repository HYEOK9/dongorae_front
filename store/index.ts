import {
    configureStore,
    combineReducers,
    AnyAction,
    CombinedState,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import authSlice, { authState } from "./authSlice";
import searchSlice, { searchState } from "./searchSlice";
import curLocationSlice, { curLocationState } from "./curLocationSlice";
import { Reducer } from "@reduxjs/toolkit";

export interface RootState {
    auth: authState;
    search: searchState;
    curLocation: curLocationState;
}

const RootReducer = (
    state: RootState,
    action: AnyAction
): CombinedState<RootState> => {
    if (action.type === HYDRATE) return { ...state, ...action.payload };
    const combinedReducer = combineReducers({
        auth: authSlice.reducer,
        search: searchSlice.reducer,
        curLocation: curLocationSlice.reducer,
    });
    return combinedReducer(state, action);
};

const makeStore = () =>
    configureStore({
        reducer: RootReducer as Reducer<CombinedState<RootState>, AnyAction>,
    });

export const wrapper = createWrapper(makeStore);
