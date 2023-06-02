import {RoleType} from "../../types";

type AuthResponse = {
   Role: RoleType | null
   Name: string
   Email: string
   AccessToken: string
   RefreshToken: string
}

export default AuthResponse