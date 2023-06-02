import {Chip, Switch} from "@mui/material";
import {Roles} from "../../../constants";
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/RootStore";
import {RoleType} from "../../../types";

function SideBarPreview()
{
   const selectedUser = useSelector((state: RootState) => state.UserTableSlice.selectedUser)

   const EmptySideBar = () => (
      <section className={"side-bar-preview--empty"}>
         <p className={"text-2xl font-bold text-slate-400 mb-1"}>Nothing to show</p>
         <p className={"text-slate-500"}>select something to see detail</p>
      </section>
   )

   return (
      <aside className={"side-bar-preview"}>
         {
            selectedUser ? (
               <section className={"side-bar-preview__user"}>
                  <div className={"side-bar-preview__user--primary"}>
                     <p className={"side-bar-preview__user__name"}>{selectedUser.DisplayName}</p>
                     <Chip
                        className={"side-bar-preview__user__role"} label={Roles[selectedUser.Role as RoleType].value}
                        color={Roles[selectedUser.Role as RoleType].color} variant="outlined" size={"small"}
                     />
                  </div>
                  <div className={"side-bar-preview__user--secondary"}>
                     <p>- {selectedUser.Email}</p>
                     <p>- {selectedUser.CreatedAt.toString()}</p>
                  </div>
                  <div className={"side-bar-preview__user--tertiary"}>
                     <Chip
                        className={"side-bar-preview__user__status"}
                        label={selectedUser.IsActive ? "active" : "disable"}
                        color={selectedUser.IsActive ? "success" : "default"} variant="filled" size={"small"}
                     />
                     <Switch checked={selectedUser.IsActive} onClick={() => {
                        console.log("acb")
                     }} size={"small"}/>
                  </div>
               </section>
            ) : (
               <EmptySideBar/>
            )
         }
      </aside>
   )
}

export default SideBarPreview