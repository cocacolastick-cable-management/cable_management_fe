import {GridToolbarExport, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton, GridToolbarQuickFilter} from "@mui/x-data-grid";
import * as React from "react";
import {Button} from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

function AccountTableToolBar()
{
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
            size={"small"}
            variant="contained"
            startIcon={<AddCircleOutlineOutlinedIcon/>}
         >
            New Account
         </Button>
      </GridToolbarContainer>
   )
}

export default AccountTableToolBar