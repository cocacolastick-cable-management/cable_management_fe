import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {RootState, useRootDispatch} from "../../../stores/RootStore";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPlannerContractList, fetchSupplierContractList} from "../../../stores/ContractTableStore";
import {formatFriendlyDatetime} from "../../../utils";
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";
import {setSelectedContract} from "../../../stores/PlannerDashBoardStore";
import {TableToolBar} from "../inputs";

const supplierColumns: GridColDef[] = [
   { field: 'Serial', headerName: 'Serial', flex: 0.05},
   { field: 'Name', headerName: 'Name', flex: 0.15},
   { field: 'CableAmount', headerName: 'CableAmount', flex: 0.15},
   { field: 'Stock', headerName: 'Stock', flex: 0.15},
   { field: 'ExpireIn', headerName: 'ExpireIn', flex: 0.2},
];

const plannerColumns: GridColDef[] = [
   { field: 'Serial', headerName: 'Serial', flex: 0.05},
   { field: 'Name', headerName: 'Name', flex: 0.15},
   { field: 'CableAmount', headerName: 'CableAmount', flex: 0.15},
   { field: 'Stock', headerName: 'Stock', flex: 0.15},
   { field: 'SupplierEmail', headerName: 'SupplierEmail', flex: 0.3},
   { field: 'ExpireIn', headerName: 'ExpireIn', flex: 0.2},
];

function ContractTable()
{
   const dispatch = useRootDispatch()
   const {contractList, status} = useSelector((state: RootState) => state.ContractTableSlice)
   const {authData} = useSelector((state: RootState) => state.AuthSlice)
   const [rows, setRow] = useState<any[]>([])
   const [columns, setColumns] = useState<any[]>(authData.Role === "planner" ? plannerColumns : supplierColumns)

   useEffect(() => {
      if (contractList === null) {
         if (authData.Role === "planner") dispatch(fetchPlannerContractList())
         if (authData.Role === "supplier") dispatch(fetchSupplierContractList())
      }
   }, [authData.Role, dispatch, contractList])

   useEffect(() => {
      if (authData.Role === "planner") {
         setColumns(plannerColumns)
      } else if (authData.Role === "supplier") {
         setColumns(supplierColumns)
      }
   }, [authData.Role])

   useEffect(() => {
      setRow(contractList?.map((contract, index) => {
         return {id: contract.Id ,Serial: index + 1, Name: contract.UniqueName, CableAmount: contract.CableAmount, Stock: contract.Stock, SupplierEmail: contract.SupplierEmail, ExpireIn: formatFriendlyDatetime(contract.EndDay)}
      }) ?? [])
   }, [authData.Role, contractList])

   const handleRowSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
      const contract = contractList?.find((item) => {
         return item.Id === rowSelectionModel[0] ? item : null
      }) ?? null
      dispatch(setSelectedContract(contract))
   }

   return (
      <div className={"contract-table"}>
         <DataGrid
            loading={status === "pending"}
            onRowSelectionModelChange={handleRowSelectionChange}
            density={"standard"} columns={columns} rows={rows ?? []}
            slots={{ toolbar: TableToolBar }}
         />
      </div>
   )
}

export default ContractTable