import {UserResponse} from "../api_schema";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MyAxios} from "../infrastructures";

interface UserTableStateType {
   userList: UserResponse[] | null
   selectedUser: UserResponse | null
   status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: UserTableStateType = {
   userList: null,
   selectedUser: null,
   status: "idle"
}

const fetchUserList = createAsyncThunk("UserTableSlice/fetchUserList", async (roles: string) => {
   try {
      const res = await MyAxios.get("/common/users", {params: {roles: roles} })
      // TODO this should be written at backend
      return (res.data.Payload as UserResponse[])
         .sort((a, b) => ((new Date(b.CreatedAt)).getTime() - (new Date(a.CreatedAt)).getTime()))
   } catch (err) {
      console.error(err)
   }
})

const UserTableSlice = createSlice(({
   name: "UserTableSlice",
   initialState,
   reducers: {
      setSelectedUser(state, action: PayloadAction<{id: string}>) {
         state.selectedUser = state.userList?.find((user) => user.Id === action.payload.id) ?? null
      },
      clearUserTableStore: (state) => {
         state.status = initialState.status
         state.selectedUser = initialState.selectedUser
         state.userList = initialState.userList
      },
      addUserToHead: (state, action: PayloadAction<UserResponse>) => {
         state.userList = [action.payload, ...(state.userList ?? [])]
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
export const {setSelectedUser, clearUserTableStore, addUserToHead} = UserTableSlice.actions
export default UserTableSlice.reducer