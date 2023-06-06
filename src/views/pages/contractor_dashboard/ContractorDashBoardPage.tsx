import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../stores/RootStore";
import {ReactNode, useEffect, useState} from "react";
import WithDrawPreview from "../supplier_dashboard/WithDrawPreview";
import {TableLayout} from "../../layouts/table";
import {TabNav, TabRouteType} from "../../base_components";
import {WithDrawTable, NotifSection} from "../../components";
import {setSelectedContract, setSelectedWithDraw} from "../../../stores/PlannerDashBoardStore";

function ContractorDashBoardPage()
{
   const dispatch = useDispatch();
   const {selectedWithDraw} = useSelector((state: RootState) => state.PlannerDashBoardSlice)

   const [previewUI, setPreviewUI] = useState<ReactNode>(null)

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
      }
   ]

   const onRouteChange = () => {
      dispatch(setSelectedWithDraw(null))
      dispatch(setSelectedContract(null))
   }

   useEffect(() => {
      if (selectedWithDraw) setPreviewUI(<WithDrawPreview data={selectedWithDraw}/>)
   }, [selectedWithDraw])

   return (
      <TableLayout
         sideBar={previewUI}
         name={"SUPPLIER DASHBOARD"}
         table={<TabNav onTabChange={onRouteChange} routes={routes}/>}
      />
   )
}



export default ContractorDashBoardPage