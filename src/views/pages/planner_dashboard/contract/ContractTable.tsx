import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {RootState, useRootDispatch} from "../../../../stores/RootStore";
import {useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {fetchPlannerContractList} from "../../../../stores/ContractTableStore";
import {formatFriendlyDatetime} from "../../../../utils";
import {TableToolBar} from "../../../components";

const columns: GridColDef[] = [
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

   useEffect(() => {
      if (contractList === null) dispatch(fetchPlannerContractList())
   }, [dispatch, contractList])

   const rows = useMemo(() =>  {
      return contractList?.map((contract, index) => {
         return {id: contract.Id ,Serial: index + 1, Name: contract.UniqueName, CableAmount: contract.CableAmount, Stock: contract.Stock, SupplierEmail: contract.SupplierEmail, ExpireIn: formatFriendlyDatetime(contract.EndDay)}
      })
   }, [contractList])

   return (
      <div className={"contract-table"}>
         <DataGrid
            loading={status === "pending"}
            // onRowSelectionModelChange={handleRowSelectionChange}
            density={"standard"} columns={columns} rows={rows ?? []}
            slots={{ toolbar: TableToolBar }}
         />
      </div>
   )
}

export default ContractTable