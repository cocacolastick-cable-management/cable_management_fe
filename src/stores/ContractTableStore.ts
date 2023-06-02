import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {MyAxios} from "../infrastructures";
import {ContractResponse} from "../api_schema";

interface ContractTableStateType {
   contractList: ContractResponse[] | null
   selectedWithDraw: ContractResponse | null
   status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: ContractTableStateType = {
   contractList: null,
   selectedWithDraw: null,
   status: 'idle'
}

const fetchPlannerContractList = createAsyncThunk("ContractTableSlice/fetchPlannerContractList", async () => {
   try {
      const res = await MyAxios.get("/planner/contracts")
      return res.data.Payload as ContractResponse[]
   } catch (err) {
      console.error(err)
   }
})

const ContractTableSlice = createSlice({
   name: "ContractTableSlice",
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(fetchPlannerContractList.pending, (state) => {
            state.status = "pending"
         })
         .addCase(fetchPlannerContractList.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.contractList = action.payload ?? []
         })
   }
})

export {ContractTableSlice}
export {fetchPlannerContractList}
export const {} = ContractTableSlice.actions
export default ContractTableSlice.reducer