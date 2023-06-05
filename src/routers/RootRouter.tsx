import {BrowserRouter, Route, Routes} from "react-router-dom"
import {
   AdminDashBoardPage,
   DashBoardLayout,
   PrivateRouteLayout,
   RootLayout,
   SignInPage,
   PlannerDashBoardPage,
   SupplierDashBoardPage,
   ContractorDashBoardPage
} from "../views"

function RootRouter()
{
   return (
      <BrowserRouter>

         <Routes>

            <Route element={<RootLayout/>}>

               <Route path={"sign-in"} element={<SignInPage/>}/>

               <Route element={<PrivateRouteLayout/>}>

                  <Route path={"admin"} element={<DashBoardLayout/>}>
                     <Route path={"dashboard"} element={<AdminDashBoardPage/>} />
                  </Route>

                  <Route path={"planner"} element={<DashBoardLayout/>}>
                     <Route path={"dashboard"} element={<PlannerDashBoardPage/>} />
                  </Route>

                  <Route path={"supplier"} element={<DashBoardLayout/>}>
                     <Route path={"dashboard"} element={<SupplierDashBoardPage/>} />
                  </Route>

                  <Route path={"contractor"} element={<DashBoardLayout/>}>
                     <Route path={"dashboard"} element={<ContractorDashBoardPage/>} />
                  </Route>

               </Route>

            </Route>

         </Routes>

      </BrowserRouter>
   )
}

export default RootRouter