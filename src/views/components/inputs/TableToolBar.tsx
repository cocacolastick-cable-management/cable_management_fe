import {GridToolbarExport, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton, GridToolbarQuickFilter} from "@mui/x-data-grid";
import * as React from "react";
import {ReactNode} from "react";

type TableToolBarProps = {
   rightTool?: ReactNode
}

function TableToolBar(props: TableToolBarProps)
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
         {props.rightTool}
      </GridToolbarContainer>
   )
}

export default TableToolBar