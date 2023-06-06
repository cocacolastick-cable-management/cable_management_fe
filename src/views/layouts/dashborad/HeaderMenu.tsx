import {Fade, IconButton, Menu, MenuItem} from "@mui/material"
import {MouseEvent, useState} from "react"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import Logout from '@mui/icons-material/Logout'
import {useDispatch} from "react-redux";
import {clearAuthData} from "../../../stores/AuthStore";
import {useNavigate} from "react-router-dom";
import {clearPlannerDashBoardSlice} from "../../../stores/PlannerDashBoardStore";
import {clearWithDrawTableStore} from "../../../stores/WithDrawTableStore";
import {clearContractTableStore} from "../../../stores/ContractTableStore";
import {clearUserTableStore} from "../../../stores/UserTableStore";
import {clearNotifSlice} from "../../../stores/NotifStore";

function HeaderMenu()
{
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(null);
   };

   const handleLogout = () => {
      dispatch(clearPlannerDashBoardSlice())
      dispatch(clearWithDrawTableStore())
      dispatch(clearContractTableStore())
      dispatch(clearAuthData())
      dispatch(clearUserTableStore())
      dispatch(clearNotifSlice())
      setAnchorEl(null);
      navigate("/sign-in", {replace: true})
   };

   return (
      <section className={"header-menu"}>
         <IconButton
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
         >
            <MoreVertOutlinedIcon/>
         </IconButton>
         <Menu
            id="fade-menu"
            MenuListProps={{
               'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
         >
            <MenuItem onClick={handleLogout}><Logout/> <p className={"ml-3"}>Logout</p></MenuItem>
         </Menu>
      </section>
   );
}
// <section className={"header-menu"}>
//    <IconButton aria-label="delete">
//       <BrightnessLowIcon/>
//    </IconButton>
//
//
// </section>
export default HeaderMenu