import * as React from 'react'
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid'
import AccountTableToolBar from "./AccountTableToolBar"
import { v4 as uuidv4 } from 'uuid';

const rows: GridRowsProp = [
   {id: uuidv4(), Serial: 1, Role: "xin chao 1", Name: "ok", Email: "ok@gmail.com"},
   {id: uuidv4(), Serial: 1, Role: "xin chao 2", Name: "ok", Email: "ok@gmail.com"},
   {id: uuidv4(), Serial: 1, Role: "xin chao 3", Name: "ok", Email: "ok@gmail.com"},
   {id: uuidv4(), Serial: 1, Role: "xin chao 4", Name: "ok", Email: "ok@gmail.com"},
   {id: uuidv4(), Serial: 1, Role: "xin chao 5", Name: "ok", Email: "ok@gmail.com"},
   {id: uuidv4(), Serial: 1, Role: "xin chao 6", Name: "ok", Email: "ok@gmail.com"},
   {id: uuidv4(), Serial: 1, Role: "xin chao 7", Name: "ok", Email: "ok@gmail.com"},
];

const columns: GridColDef[] = [
   { field: 'Serial', headerName: 'Serial', flex: 0.1},
   { field: 'Role', headerName: 'Role', flex: 0.15},
   { field: 'Name', headerName: 'Name', flex: 0.3},
   { field: 'Email', headerName: 'Email', flex: 0.45},
];

function AccountTable()
{
   return (
      <div className={"account-table"}>
         <DataGrid density={"standard"} rows={rows} columns={columns} slots={{ toolbar: AccountTableToolBar }}/>
      </div>
   );
}

export default AccountTable