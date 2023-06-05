import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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
      // TODO this should be written at backend
      return (res.data.Payload as ContractResponse[])
         .sort((a, b) => ((new Date(b.CreatedAt)).getTime() - (new Date(a.CreatedAt)).getTime()))
   } catch (err) {
      console.error(err)
   }
})

const fetchSupplierContractList = createAsyncThunk("ContractTableSlice/fetchSupplierContractList", async () => {
   try {
      const res = await MyAxios.get("/supplier/contracts")
      // TODO this should be written at backend
      return (res.data.Payload as ContractResponse[])
         .sort((a, b) => ((new Date(b.CreatedAt)).getTime() - (new Date(a.CreatedAt)).getTime()))
   } catch (err) {
      console.error(err)
   }
})

const ContractTableSlice = createSlice({
   name: "ContractTableSlice",
   initialState,
   reducers: {
      addUpContractStockById: (state, action: PayloadAction<{id: string, stock: number}>) => {
         const index = state.contractList?.findIndex((contract) => {
            return contract.Id === action.payload.id
         })
         if (index !== undefined && index >= 0) {
            const newContractList = [...state.contractList!]
            newContractList[index].Stock = newContractList[index].Stock + action.payload.stock
            state.contractList = newContractList
         }
      },
      clearContractTableStore: (state) => {
         state.contractList = initialState.contractList
         state.selectedWithDraw = initialState.selectedWithDraw
         state.status = initialState.status
      }
   },
   extraReducers: builder => {
      builder
         .addCase(fetchPlannerContractList.pending, (state) => {
            state.status = "pending"
         })
         .addCase(fetchPlannerContractList.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.contractList = action.payload ?? []
         })
      builder
         .addCase(fetchSupplierContractList.pending, (state) => {
            state.status = "pending"
         })
         .addCase(fetchSupplierContractList.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.contractList = action.payload ?? []
         })
   }
})

export {ContractTableSlice}
export {fetchPlannerContractList, fetchSupplierContractList}
export const {addUpContractStockById, clearContractTableStore} = ContractTableSlice.actions
export default ContractTableSlice.reducer