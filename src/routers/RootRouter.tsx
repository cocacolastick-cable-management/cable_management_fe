import {BrowserRouter, Route, Routes} from "react-router-dom"
import {AdminDashBoardPage, DashBoardLayout, RootLayout, SignInPage} from "../views"

function RootRouter()
{
   return (
      <BrowserRouter>

         <Routes>

            <Route path={"/"} element={<RootLayout/>}>

               <Route path={"sign-in"} element={<SignInPage/>}/>

               <Route path={"admin"} element={<DashBoardLayout/>}>
                  <Route path={"dashboard"} element={<AdminDashBoardPage/>} />
               </Route>

               <Route path={"planner"} element={<DashBoardLayout/>}>

               </Route>

               <Route path={"supplier"} element={<DashBoardLayout/>}>

               </Route>

               <Route path={"contractor"} element={<DashBoardLayout/>}>

               </Route>

            </Route>

         </Routes>

      </BrowserRouter>
   )
}

export default RootRouter