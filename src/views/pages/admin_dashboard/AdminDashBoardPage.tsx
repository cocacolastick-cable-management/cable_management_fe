import SideBarPreview from "./SideBarPreview"
import UserTable from "./UserTable"
import {IconButton} from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

function AdminDashBoardPage()
{
   return (
      <section className={"admin-dashboard-page"}>
         <header className={"admin-dashboard-page__header"}>
            <IconButton size={"small"}><ArrowBackIosIcon fontSize={"small"}/></IconButton>
            <p className={"admin-dashboard-page__header__title"}>Accounts</p>
         </header>
         <div className={"admin-dashboard-page__body"}>
            <SideBarPreview/>
            <UserTable/>
         </div>
      </section>
   )
}

export default AdminDashBoardPage