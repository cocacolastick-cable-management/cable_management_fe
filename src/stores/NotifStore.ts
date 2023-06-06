import {NotifResponse} from "../api_schema";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {MyAxios} from "../infrastructures";

interface NotifStateType {
   notifList: NotifResponse[] | null
   numberOfRead: number | null
   status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: NotifStateType = {
   notifList: null,
   numberOfRead: null,
   status: 'idle'
}

const fetchNotifList = createAsyncThunk("NotifSlice/fetchNotifList", async () => {
   try {
      const res = await MyAxios.get("common/notifications")
      return (res.data.Payload as NotifResponse[])
         .sort((a, b) => ((new Date(b.CreatedAt)).getTime() - (new Date(a.CreatedAt)).getTime()))
   } catch (exc) {
      console.error(exc)
   }
})

const NotifSlice = createSlice({
   name: "NotifSlice",
   initialState,
   reducers: {
      clearNotifSlice: (state) => {
         state.status = initialState.status
         state.notifList = initialState.notifList
         state.numberOfRead = initialState.numberOfRead
      }
   },
   extraReducers: builder => {
      builder
         .addCase(fetchNotifList.pending, (state) => {
            state.status = "pending"
         })
         .addCase(fetchNotifList.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.notifList = action.payload ?? []
         })
   }
})

export {NotifSlice}
export {fetchNotifList}
export const {clearNotifSlice} = NotifSlice.actions
export default NotifSlice.reducer