import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RootLayout} from "../views";

function RootRouter()
{
   return (
      <BrowserRouter>

         <Routes>

            <Route path={"/"} element={<RootLayout/>}>

            </Route>

         </Routes>

      </BrowserRouter>
   )
}

export default RootRouter