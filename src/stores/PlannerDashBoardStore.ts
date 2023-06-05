import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ContractResponse, WithDrawResponse} from "../api_schema";

interface PlannerDashBoardStateType {
   selectedWithDraw: WithDrawResponse | null
   selectedContract: ContractResponse | null
}

const initialState: PlannerDashBoardStateType = {
   selectedWithDraw: null,
   selectedContract: null
}

const PlannerDashBoardSlice = createSlice({
   name: "PlannerDashBoardSlice",
   initialState,
   reducers: {
      setSelectedWithDraw: (state, action: PayloadAction<WithDrawResponse | null>) => {
         state.selectedWithDraw = action.payload
         state.selectedContract = null
      },
      setSelectedContract: (state, action: PayloadAction<ContractResponse | null>) => {
         state.selectedContract = action.payload
         state.selectedWithDraw = null
      },
      clearPlannerDashBoardSlice: (state) => {
         state.selectedWithDraw = null
         state.selectedContract = null
      }
   }
})

export {PlannerDashBoardSlice}
export const {setSelectedWithDraw, setSelectedContract, clearPlannerDashBoardSlice} = PlannerDashBoardSlice.actions
export default PlannerDashBoardSlice.reducer