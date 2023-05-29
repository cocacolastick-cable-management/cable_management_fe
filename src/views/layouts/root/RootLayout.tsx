import {Outlet} from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
   palette: {
      mode: 'dark',
   },
});

function RootLayout()
{
   return (
      <ThemeProvider theme={theme}>
         <div className={"root-layout"}>
            <div className={"root-layout--inner"}>
               <Outlet/>
            </div>
         </div>
      </ThemeProvider>
   )
}

export default RootLayout