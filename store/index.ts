import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { createStore, Store } from "redux";
import { reducer, RootState } from "./reducers/index";

const makeStore: MakeStore<Store<RootState>> = (context: Context) =>
    createStore(reducer);

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
    debug: true,
});
