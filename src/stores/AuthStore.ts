import {AuthResponse} from "../api_schema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthStateType {
   authData: AuthResponse
   isAuth: boolean
}

const localAuthDataKey = "localAuthDataKey"
const authData = JSON.parse(localStorage.getItem(localAuthDataKey)!)

const initialState: AuthStateType = {
   authData: authData as AuthResponse ?? {
      Role: null,
      Name: "",
      Email: "",
      AccessToken: "",
      RefreshToken: ""
   },
   isAuth: !!authData
}

const AuthSlice = createSlice({
   name: "AuthSlice",
   initialState,
   reducers: {
      setAuthData: (state, action: PayloadAction<AuthResponse>) => {
         state.authData = action.payload
         localStorage.setItem(localAuthDataKey, JSON.stringify(action.payload))
      },
      clearAuthData: (state) => {
         state.authData = initialState.authData
         state.isAuth = false
         localStorage.removeItem(localAuthDataKey)
      },
      fetchAuthDataFromLocal: (state) => {
         state.authData = JSON.parse(localStorage.getItem(localAuthDataKey)!) as AuthResponse
      }
   }
})

export {AuthSlice, localAuthDataKey}
export const {
   setAuthData, clearAuthData, fetchAuthDataFromLocal
} = AuthSlice.actions
export default AuthSlice.reducer