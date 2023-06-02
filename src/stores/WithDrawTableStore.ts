import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {MyAxios} from "../infrastructures";
import {WithDrawResponse} from "../api_schema";

interface WithDrawTableSateType {
   withDrawList: WithDrawResponse[] | null
   selectedWithDraw: WithDrawResponse | null
   status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: WithDrawTableSateType = {
   withDrawList: null,
   selectedWithDraw: null,
   status: "idle"
}

const fetchPlannerWithDrawList = createAsyncThunk("WithDrawTableSlice/fetchPlannerWithDrawList", async () => {
   try {
      const res = await MyAxios.get("/planner/with-draws")
      return res.data.Payload as WithDrawResponse[]
   } catch (err) {
      console.error(err)
   }
})

const WithDrawTableSlice = createSlice({
   name: "WithDrawTableSlice",
   initialState,
   reducers: {

   },
   extraReducers: builder => {
      builder
         .addCase(fetchPlannerWithDrawList.pending, (state) => {
            state.status = "pending"
         })
         .addCase(fetchPlannerWithDrawList.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.withDrawList = action.payload ?? []
         })
   }
})

export {WithDrawTableSlice}
export {fetchPlannerWithDrawList}
export const {} = WithDrawTableSlice.actions
export default WithDrawTableSlice.reducer