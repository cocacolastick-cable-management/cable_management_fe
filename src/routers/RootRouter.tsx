import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DashBoardLayout, RootLayout} from "../views";

function RootRouter()
{
   return (
      <BrowserRouter>

         <Routes>

            <Route path={"/"} element={<RootLayout/>}>

               <Route path={"/admin"} element={<DashBoardLayout/>}>

               </Route>

               <Route path={"/planner"} element={<DashBoardLayout/>}>

               </Route>

               <Route path={"/supplier"} element={<DashBoardLayout/>}>

               </Route>

               <Route path={"/contractor"} element={<DashBoardLayout/>}>

               </Route>

            </Route>

         </Routes>

      </BrowserRouter>
   )
}

export default RootRouter