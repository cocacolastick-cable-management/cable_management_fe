import {UserResponse} from "../api_schema";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MyAxios} from "../infrastructures";

interface UserTableStateType {
   userList: UserResponse[]
   selectedUser: UserResponse | null
   status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: UserTableStateType = {
   userList: [],
   selectedUser: null,
   status: "idle"
}

const fetchUserList = createAsyncThunk("UserTableSlice/fetchUserList", async () => {
   try {
      const res = await MyAxios.get("/admin/users")
      return res.data.Payload as UserResponse[]
   } catch (err) {
      console.error(err)
   }
})

const UserTableSlice = createSlice(({
   name: "UserTableSlice",
   initialState,
   reducers: {
      setSelectedUser(state, action: PayloadAction<{id: string}>) {
         state.selectedUser = state.userList.find((user) => user.Id === action.payload.id) ?? null
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchUserList.pending, (state) => {
            state.status = "pending"
         })
         .addCase(fetchUserList.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.userList = action.payload ?? []
         })
   }
}))

export {UserTableSlice}
export {fetchUserList}
export const {setSelectedUser} = UserTableSlice.actions
export default UserTableSlice.reducer