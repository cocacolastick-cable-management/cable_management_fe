import {Chip} from '@mui/material'

function UserInfo()
{
   return (
      <article className={"user-info"}>
         <div className={"user-info--top"}>
            <p className={"user-info--top__name"}>Vu Planner</p>
            <Chip
               className={"user-info--top__role"} label="Admin"
               color={"primary"} variant="outlined" size={"small"}
            />
         </div>
         <p className={"user-info__email"}>vuphamlethanh@gmail.com</p>
      </article>
   )
}

export default UserInfo