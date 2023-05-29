import Header from "./Header"
import {Outlet} from "react-router-dom"

function DashBoardLayout()
{
   return (
      <div className={"dashboard-layout"}>
         <Header/>
         <Outlet/>
      </div>
   )
}

export default DashBoardLayout