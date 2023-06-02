import {IconButton} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SideBarPreview from "./SideBarPreview";
import {ReactNode} from "react";

type TableLayoutProps = {
   name?: string
   table?: ReactNode
}

function TableLayout(props: TableLayoutProps)
{
   return (
      <section className={"table-layout"}>
         <header className={"table-layout__header"}>
            <IconButton size={"small"}><ArrowBackIosIcon fontSize={"small"}/></IconButton>
            <p className={"table-layout__header__title"}>{props.name}</p>
         </header>
         <div className={"table-layout__body"}>
            <SideBarPreview/>
            <div className={"table-layout__body--main"}>{props.table}</div>
         </div>
      </section>
   )
}

export default TableLayout