import { configureStore } from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import AuthReducer from "./AuthStore";
import UserTableReducer from "./UserTableStore";
import WithDrawTableReducer from "./WithDrawTableStore";
import ContractTableStore from "./ContractTableStore";

const RootStore = configureStore({
   reducer: {
      AuthSlice: AuthReducer,
      UserTableSlice: UserTableReducer,
      WithDrawTableSlice: WithDrawTableReducer,
      ContractTableSlice: ContractTableStore
   },
})

export default RootStore
export type RootState = ReturnType<typeof RootStore.getState>
export const useRootDispatch: () => typeof RootStore.dispatch = useDispatch