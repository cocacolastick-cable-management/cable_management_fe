import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {RootState, useRootDispatch} from "../../../stores/RootStore";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchContractorWithDrawList, fetchSupplierWithDrawList} from "../../../stores/WithDrawTableStore";
import {formatFriendlyDatetime} from "../../../utils";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";
import {setSelectedWithDraw} from "../../../stores/PlannerDashBoardStore";
import {TableToolBar} from "../inputs";

const supplierColumns: GridColDef[] = [
   { field: 'Serial', headerName: 'Serial', flex: 0.05},
   { field: 'ContractName', headerName: 'ContractName', flex: 0.15},
   { field: 'Status', headerName: 'Status', flex: 0.1},
   { field: 'CableAmount', headerName: 'CableAmount', flex: 0.1},
   { field: 'ContractorEmail', headerName: 'ContractorEmail', flex: 0.225},
   { field: 'CreatedAt', headerName: 'CreatedAt', flex: 0.15},
];

const contractorColumns: GridColDef[] = [
   { field: 'Serial', headerName: 'Serial', flex: 0.05},
   { field: 'ContractName', headerName: 'ContractName', flex: 0.15},
   { field: 'Status', headerName: 'Status', flex: 0.1},
   { field: 'CableAmount', headerName: 'CableAmount', flex: 0.1},
   { field: 'SupplierEmail', headerName: 'SupplierEmail', flex: 0.225},
   { field: 'CreatedAt', headerName: 'CreatedAt', flex: 0.15},
];

function WithDrawTable()
{
   const dispatch = useRootDispatch()
   const {withDrawList, status} = useSelector((state: RootState) => state.WithDrawTableSlice)
   const {authData} = useSelector((state: RootState) => state.AuthSlice)
   const [rows, setRows] = useState<any[]>([])
   const [columns, setColumns] = useState<any[]>([])

   useEffect(() => {
      setColumns(() => {
         if (authData.Role === "supplier") {
            return supplierColumns
         } else if (authData.Role === "contractor") {
            return contractorColumns
         } else {
            return []
         }
      })
   }, [authData.Role])

   useEffect(() => {
      if (withDrawList === null) {
         if (authData.Role === "supplier" ) dispatch(fetchSupplierWithDrawList())
         if (authData.Role === "contractor" ) dispatch(fetchContractorWithDrawList())
      }
   }, [authData.Role, dispatch, withDrawList])

   useEffect(() => {
      setRows(withDrawList?.map((withDraw, index) => {
         return {
            id: withDraw.Id,
            Serial: index + 1,
            ContractName: withDraw.ContractUniqueName,
            Status: withDraw.Status,
            CableAmount: withDraw.CableAmount,
            ContractorEmail: withDraw.ContractorEmail,
            SupplierEmail: withDraw.SupplierEmail,
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
            density={"standard"} columns={columns} rows={rows}
            slots={{ toolbar: TableToolBar }}
         />
      </div>
   )
}

export default WithDrawTable