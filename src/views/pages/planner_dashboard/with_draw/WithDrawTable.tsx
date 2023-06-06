import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {RootState, useRootDispatch} from "../../../../stores/RootStore";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPlannerWithDrawList} from "../../../../stores/WithDrawTableStore";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";
import WithDrawTableToolBar from "./WithDrawTableToolBar";
import {formatFriendlyDatetime} from "../../../../utils";
import {setSelectedWithDraw} from "../../../../stores/PlannerDashBoardStore";

const columns: GridColDef[] = [
   { field: 'Serial', headerName: 'Serial', flex: 0.05},
   { field: 'RequestName', headerName: 'RequestName', flex: 0.15},
   { field: 'ContractName', headerName: 'ContractName', flex: 0.15},
   { field: 'Status', headerName: 'Status', flex: 0.1},
   { field: 'CableAmount', headerName: 'CableAmount', flex: 0.1},
   { field: 'SupplierEmail', headerName: 'SupplierEmail', flex: 0.225},
   { field: 'ContractorEmail', headerName: 'ContractorEmail', flex: 0.225},
   { field: 'CreatedAt', headerName: 'CreatedAt', flex: 0.15},
];

function WithDrawTable()
{
   const dispatch = useRootDispatch()
   const {withDrawList, status} = useSelector((state: RootState) => state.WithDrawTableSlice)
   const [rows, setRows] = useState<any[]>([])

   useEffect(() => {
      if (withDrawList === null) dispatch(fetchPlannerWithDrawList())
   }, [dispatch, withDrawList])

   useEffect(() => {
      setRows(withDrawList?.map((withDraw, index) => {
         return {
            id: withDraw.Id,
            Serial: index + 1,
            RequestName: withDraw.UniqueName,
            ContractName: withDraw.ContractUniqueName,
            Status: withDraw.Status,
            CableAmount: withDraw.CableAmount,
            SupplierEmail: withDraw.SupplierEmail,
            ContractorEmail: withDraw.ContractorEmail,
            CreatedAt: formatFriendlyDatetime(withDraw.CreatedAt)
         }
      }) ?? [])
   }, [withDrawList])
   
   const handleRowSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
      const withDraw = withDrawList?.find((item) => {
         return item.Id === rowSelectionModel[0] ? item : null
      }) ?? null
      dispatch(setSelectedWithDraw(withDraw))
   }

   return (
      <div className={"with-draw-table"}>
         <DataGrid
            loading={status === "pending"}
            onRowSelectionModelChange={handleRowSelectionChange}
            density={"standard"} columns={columns} rows={rows ?? []}
            slots={{ toolbar: WithDrawTableToolBar }}
         />
      </div>
   )
}

export default WithDrawTable