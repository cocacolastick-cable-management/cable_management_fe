import {GridToolbarExport, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton, GridToolbarQuickFilter} from "@mui/x-data-grid";
import * as React from "react";
import {Button} from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CreateUserFormDialog from "./CreateUserFormDialog";
import {useState} from "react";

//TODO: implement TableToolBar
function UserTableToolBar()
{
   const [isCreateAccountFormOpen, setIsCreateAccountFormOpen] = useState<boolean>(false)

   return (
      <GridToolbarContainer className={"tool-bar"}>
         <div className={"tool-bar--left"}>
            <GridToolbarColumnsButton size={"small"} variant={"outlined"}/>
            <GridToolbarFilterButton
               // @ts-ignore
               size={"small"} variant={"outlined"}
            />
            <GridToolbarExport size={"small"} variant={"outlined"}/>
         </div>
         <GridToolbarQuickFilter/>
         <Button
            onClick={() => setIsCreateAccountFormOpen(true)}
            size={"small"}
            variant="contained"
            startIcon={<AddCircleOutlineOutlinedIcon/>}
         >
            New Account
         </Button>
         <CreateUserFormDialog
            handleClose={() => { setIsCreateAccountFormOpen(false)}}
            isOpen={isCreateAccountFormOpen}/>
      </GridToolbarContainer>
   )
}

export default UserTableToolBar