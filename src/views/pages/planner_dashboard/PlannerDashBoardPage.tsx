import {TableLayout} from "../../layouts/table"
import {useState} from "react"
import {TabNav, TabRouteType} from "../../base_components";
import {WithDrawTable} from "./with_draw";
import NotifSection from "./NotifSection";
import {ContractTable} from "./contract";
import {UserTable} from "../../components";
import {Roles} from "../../../constants";

function PlannerDashBoardPage()
{
   const [routes, setRoutes] = useState<TabRouteType[]>(initRoutesState)

   return (
      <TableLayout
         sideBar={null}
         name={"PLANNER DASHBOARD"}
         table={<TabNav routes={routes}/>}
      />
   )
}

//TODO should have icon for label
const initRoutesState: TabRouteType[] = [
   {
      label: "NOTIFICATIONS",
      element: <NotifSection/>
      // isClosable: true
   },
   {
      label: "WITH DRAW REQUESTS",
      element: <WithDrawTable/>,
      // isClosable:
   },
   {
      label: "CONTRACTS",
      element: <ContractTable/>,
      // isClosable:
   },
   {
      label: "SUPPLIERS",
      element: <UserTable role={Roles.supplier.value}/>,
      // isClosable:
   },
   {
      label: "CONTRACTORS",
      element: <UserTable role={Roles.contractor.value}/>,
      // isClosable:
   }
]

export default PlannerDashBoardPage