import {DataGrid, GridColDef} from "@mui/x-data-grid";

const columns: GridColDef[] = [
   { field: 'Serial', headerName: 'Serial', flex: 0.05},
   { field: 'Name', headerName: 'Name', flex: 0.15},
   { field: 'CableAmount', headerName: 'CableAmount', flex: 0.15},
   { field: 'Stock', headerName: 'Stock', flex: 0.15},
   { field: 'SupplierEmail', headerName: 'SupplierEmail', flex: 0.3},
   { field: 'ExpireIn', headerName: 'ExpireIn', flex: 0.2},
];

function SupplierTable()
{
   return (
      <div className={"contract-table"}>
         <DataGrid
            // loading={status === "pending"}
            // onRowSelectionModelChange={handleRowSelectionChange}
            density={"standard"} columns={columns} rows={[]}
            // slots={{ toolbar:  }}
         />
      </div>
   )
}

export default SupplierTable