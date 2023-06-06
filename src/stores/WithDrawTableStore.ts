import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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
      // TODO this should be written at backend
      return (res.data.Payload as WithDrawResponse[])
         .sort((a, b) => ((new Date(b.CreatedAt)).getTime() - (new Date(a.CreatedAt)).getTime()))
   } catch (err) {
      console.error(err)
   }
})

const fetchSupplierWithDrawList = createAsyncThunk("fetchSupplierWithDrawList/fetchPlannerWithDrawList", async () => {
   try {
      const res = await MyAxios.get("/supplier/with-draws")
      // TODO this should be written at backend
      return (res.data.Payload as WithDrawResponse[])
         .sort((a, b) => ((new Date(b.CreatedAt)).getTime() - (new Date(a.CreatedAt)).getTime()))
   } catch (err) {
      console.error(err)
   }
})

const fetchContractorWithDrawList = createAsyncThunk("fetchContractorWithDrawList/fetchPlannerWithDrawList", async () => {
   try {
      const res = await MyAxios.get("/contractor/with-draws")
      // TODO this should be written at backend
      return (res.data.Payload as WithDrawResponse[])
         .sort((a, b) => ((new Date(b.CreatedAt)).getTime() - (new Date(a.CreatedAt)).getTime()))
   } catch (err) {
      console.error(err)
   }
})


const WithDrawTableSlice = createSlice({
   name: "WithDrawTableSlice",
   initialState,
   reducers: {
      updateWithDrawById: (state, action: PayloadAction<{id: string, withDraw: WithDrawResponse}>) => {
         const index = state.withDrawList?.findIndex((withDraw) => {
            return withDraw.Id === action.payload.id
         })
         if (index !== undefined && index >= 0) {
            const newWithDrawList = [...state.withDrawList!]
            newWithDrawList[index] = action.payload.withDraw
            state.withDrawList = newWithDrawList
         }
      },
      addWithDrawToHead: (state, action: PayloadAction<WithDrawResponse>) => {
         state.withDrawList = state.withDrawList ? [action.payload, ...state.withDrawList] : [action.payload]
      },
      clearWithDrawTableStore: (state) => {
         state.withDrawList = initialState.withDrawList
         state.selectedWithDraw = initialState.selectedWithDraw
         state.status = initialState.status
      }
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
      builder
         .addCase(fetchSupplierWithDrawList.pending, (state) => {
            state.status = "pending"
         })
         .addCase(fetchSupplierWithDrawList.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.withDrawList = action.payload ?? []
         })
      builder
         .addCase(fetchContractorWithDrawList.pending, (state) => {
            state.status = "pending"
         })
         .addCase(fetchContractorWithDrawList.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.withDrawList = action.payload ?? []
         })
   }
})

export {WithDrawTableSlice}
export {fetchPlannerWithDrawList, fetchSupplierWithDrawList, fetchContractorWithDrawList}
export const {updateWithDrawById, addWithDrawToHead, clearWithDrawTableStore} = WithDrawTableSlice.actions
export default WithDrawTableSlice.reducer