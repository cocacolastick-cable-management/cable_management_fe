import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {RootState, useRootDispatch} from "../../../stores/RootStore";
import {useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {fetchUserList} from "../../../stores/UserTableStore";
import {TableToolBar} from "../inputs";

type UserTableProps = {
   role: string
}

type UserTableRowType = {
   id: string
   Serial: number
   Name: string
   Email: string
   Status: string
}

function UserTable(props: UserTableProps)
{
   const dispatch = useRootDispatch()
   const {userList, status} = useSelector((state: RootState) => state.UserTableSlice)

   useEffect(() => {
      if(userList === null) dispatch(fetchUserList("supplier,contractor"))
   }, [dispatch, userList, props.role])

   const rows = useMemo(() => {
      return userList?.reduce((result, curUser) => {
         if (curUser.Role === props.role) {
            result.push({
               id: curUser.Id,
               Serial: result.length + 1,
               Name: curUser.DisplayName,
               Email: curUser.Email,
               Status: curUser.IsActive ? "active" : "disable"
            })
         }
         return result
      }, [] as UserTableRowType[])
   }, [props.role, userList])

   // const handleRowSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
   //    dispatch(setSelectedUser({id: rowSelectionModel[0] as string}))
   // }

   return (
      <div className={"contract-table"}>
         <DataGrid
            loading={status === "pending"}
            // onRowSelectionModelChange={handleRowSelectionChange}
            density={"standard"} rows={rows ?? []} columns={columns}
            slots={{ toolbar: TableToolBar }}
         />
      </div>
   );
}

const columns: GridColDef[] = [
   { field: 'Serial', headerName: 'Serial', flex: 0.1},
   { field: 'Name', headerName: 'Name', flex: 0.3},
   { field: 'Email', headerName: 'Email', flex: 0.5},
   { field: 'Status', headerName: 'Status', flex: 0.2},
];

export default UserTable