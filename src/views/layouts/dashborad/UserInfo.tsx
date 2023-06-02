import {Chip} from '@mui/material'
import {Roles} from "../../../constants"
import {useSelector} from "react-redux"
import {RootState} from "../../../stores/RootStore"
import {Navigate} from "react-router-dom"

function UserInfo()
{
   const authData = useSelector((state: RootState) => state.AuthSlice.authData)
   const role = Roles[authData.Role as keyof typeof Roles]

   if (role === undefined) {
      return <Navigate to={"/sign-in"} replace/>
   }

   return (
      <article className={"user-info"}>
         <div className={"user-info--top"}>
            <p className={"user-info--top__name"}>{authData.Name}</p>
            <Chip
               className={"user-info--top__role"}
               label={role.value}
               color={role.color}
               variant="outlined" size={"small"}
            />
         </div>
         <p className={"user-info__email"}>{authData.Email}</p>
      </article>
   )
}

export default UserInfo