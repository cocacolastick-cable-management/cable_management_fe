import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {RootState, useRootDispatch} from "../../../../stores/RootStore";
import {useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {fetchPlannerWithDrawList} from "../../../../stores/WithDrawTableStore";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";
import WithDrawTableToolBar from "./WithDrawTableToolBar";
import {formatFriendlyDatetime} from "../../../../utils";

const columns: GridColDef[] = [
   { field: 'Serial', headerName: 'Serial', flex: 0.05},
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

   useEffect(() => {
      if (withDrawList === null) dispatch(fetchPlannerWithDrawList())
   }, [dispatch, withDrawList])

   const rows = useMemo(() => {
      return withDrawList?.map((withDraw, index) => {
         return {
            id: withDraw.Id,
            Serial: index + 1,
            ContractName: "okay",
            Status: withDraw.Status,
            CableAmount: withDraw.CableAmount,
            SupplierEmail: withDraw.SupplierEmail,
            ContractorEmail: withDraw.ContractorEmail,
            CreatedAt: formatFriendlyDatetime(withDraw.CreatedAt)
         }
      })
   }, [withDrawList])
   
   const handleRowSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
      // dispatch(setSelectedUser({id: rowSelectionModel[0] as string}))
      console.log(rowSelectionModel[0])
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