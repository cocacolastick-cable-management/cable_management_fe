import {Box, Tab, Tabs, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {TabPanel} from "./index";
import {ReactNode, SyntheticEvent, useMemo, useState} from "react";
import {MouseEvent} from "react"

type TabRouteType = {
   label: string
   isClosable?: boolean
   element: ReactNode
}

type TabNavProps = {
   routes: TabRouteType[]
}

function TabNav(props: TabNavProps)
{
   const [tab, setTab] = useState(0);

   // const routes = useMemo(() => props.routes, [props.routes])

   const handleChange = (event: SyntheticEvent, newValue: number) => {
      setTab(newValue);
   };

   return (
      <>
         <Box width={"100%"} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs scrollButtons="auto" value={tab} onChange={handleChange}>
               {
                  props.routes.map((route, index) => {
                     return <Tab
                        key={index}
                        label={
                           route.isClosable
                           ? <ClosableLabel label={route.label} tabNum={index}/>
                           : route.label
                        }
                        {...a11yProps(index)} />
                  })
               }
            </Tabs>
         </Box>
         {
            props.routes.map((route, index) => {
               return <TabPanel key={index} value={tab} index={index}>
                  {route.element}
               </TabPanel>
            })
         }
      </>
   )
}

type ClosableLabelProps = {
   tabNum: number
   handleClose?: (event: MouseEvent<HTMLDivElement>, tab: number) => void
   label: string
}

function ClosableLabel(props: ClosableLabelProps)
{
   return (
      <span className={"flex items-center gap-1"}>
         <span>{props.label}</span>
         <IconButton
            sx={{padding: 0}}
            size={"small"}
            component="div"
            onClick={event => props.handleClose?.(event, props.tabNum)}
         >
            <CloseIcon fontSize={"small"} />
         </IconButton>
      </span>
   )
}

function a11yProps(index: number) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

export default TabNav
export {type TabRouteType}