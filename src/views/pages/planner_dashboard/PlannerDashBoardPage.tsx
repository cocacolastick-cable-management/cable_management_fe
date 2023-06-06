import {TableLayout} from "../../layouts/table"
import {ReactNode, useEffect, useState} from "react"
import {TabNav, TabRouteType} from "../../base_components";
import {WithDrawPreview, WithDrawTable} from "./with_draw";
import {ContractTable, NotifSection, UserTable} from "../../components"
import {Roles} from "../../../constants";
import {RootState} from "../../../stores/RootStore";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedContract, setSelectedWithDraw} from "../../../stores/PlannerDashBoardStore";

function PlannerDashBoardPage()
{
   const dispatch = useDispatch()
   const {selectedWithDraw, selectedContract} = useSelector((state: RootState) => state.PlannerDashBoardSlice)

   // const [routes, setRoutes] = useState<TabRouteType[]>(initRoutesState)

   const [previewUI, setPreviewUI] = useState<ReactNode>(null)

   useEffect(() => {
      if (selectedWithDraw) setPreviewUI(<WithDrawPreview data={selectedWithDraw}/>)
   }, [selectedWithDraw, selectedWithDraw?.Id])

   // useEffect(() => {
   //    if (selectedContract) setPreviewUI(<ContractPreview/>)
   // }, [selectedContract])

   return (
      <TableLayout
         sideBar={previewUI}
         name={"PLANNER DASHBOARD"}
         table={<TabNav routes={routes}/>}
      />
   )
}

//TODO should have icon for label
const routes: TabRouteType[] = [
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
      label: "CONTRACTORS",
      element: <UserTable role={Roles.contractor.value}/>,
      // isClosable:
   },
   {
      label: "SUPPLIERS",
      element: <UserTable role={Roles.supplier.value}/>,
      // isClosable:
   },
]

export default PlannerDashBoardPage