import {Fade, IconButton, Menu, MenuItem} from "@mui/material"
import {MouseEvent, useState} from "react"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

function HeaderMenu()
{
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const handleClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
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
            <MenuItem onClick={handleClose}>xxx</MenuItem>
            <MenuItem onClick={handleClose}>yyy</MenuItem>
            <MenuItem onClick={handleClose}>zzz</MenuItem>
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