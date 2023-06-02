import {useState} from "react";
import TableToolBar from "../../../components/inputs/TableToolBar";
import {Button} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import * as React from "react";
import CreateWithDrawFormDialog from "./CreateWithDrawFormDialog";

function WithDrawTableToolBar()
{
   const [isCreateWithDrawFormOpen, setIsCreateWithDrawFormOpen] = useState<boolean>(false)

   return (
      <TableToolBar
         rightTool={
         <>
            <Button
               onClick={() => setIsCreateWithDrawFormOpen(true)}
               size={"small"}
               variant="contained"
               startIcon={<AddCircleOutlineOutlinedIcon/>}
            >New Request</Button>
            <CreateWithDrawFormDialog
               isOpen={isCreateWithDrawFormOpen}
               handleClose={() => {setIsCreateWithDrawFormOpen(false)}}/>
         </>
         }
      />
   )
}

export default WithDrawTableToolBar