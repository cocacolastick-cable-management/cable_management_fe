import {TableLayout} from "../../layouts/table";
import {ReactNode, useEffect, useState} from "react";
import WithDrawPreview from "./WithDrawPreview";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../stores/RootStore";
import {TabNav, TabRouteType} from "../../base_components";
import {ContractTable, NotifSection, WithDrawTable} from "../../components";
import {setSelectedContract} from "../../../stores/PlannerDashBoardStore";

function SupplierDashBoardPage()
{
   const {selectedWithDraw} = useSelector((state: RootState) => state.PlannerDashBoardSlice)

   const [previewUI, setPreviewUI] = useState<ReactNode>(null)

   useEffect(() => {
      if (selectedWithDraw) setPreviewUI(<WithDrawPreview data={selectedWithDraw}/>)
      else setPreviewUI(null)
   }, [selectedWithDraw])

   return (
      <TableLayout
         sideBar={previewUI}
         name={"SUPPLIER DASHBOARD"}
         table={<TabNav routes={routes}/>}
      />
   )
}

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
   }
]


export default SupplierDashBoardPage