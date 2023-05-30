import SideBarPreview from "./SideBarPreview"
import AccountTable from "./AccountTable"
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
            <AccountTable/>
         </div>
      </section>
   )
}

export default AdminDashBoardPage