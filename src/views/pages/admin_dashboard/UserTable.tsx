import {DataGrid, GridColDef} from '@mui/x-data-grid'
import UserTableToolBar from "./UserTableToolBar"
import {GridRowSelectionModel} from "@mui/x-data-grid/models/gridRowSelectionModel";
import {useEffect, useMemo} from "react";
import {fetchUserList, setSelectedUser} from "../../../stores/UserTableStore";
import {RootState, useRootDispatch} from "../../../stores/RootStore";
import {useSelector} from "react-redux";

const columns: GridColDef[] = [
   { field: 'Serial', headerName: 'Serial', flex: 0.1},
   { field: 'Role', headerName: 'Role', flex: 0.15},
   { field: 'Name', headerName: 'Name', flex: 0.25},
   { field: 'Email', headerName: 'Email', flex: 0.4},
   { field: 'Status', headerName: 'Status', flex: 0.1},
];

function UserTable()
{
   const dispatch = useRootDispatch()
   const {userList, status} = useSelector((state: RootState) => state.UserTableSlice)

   useEffect(() => {
      if (userList === null) dispatch(fetchUserList("admin,planner,supplier,contractor"))
   }, [userList, dispatch])

   const rows = useMemo(() => {
      return userList?.map((user, index) => (
         {id: user.Id, Serial: index + 1, Role: user.Role, Name: user.DisplayName, Email: user.Email, Status: user.IsActive ? "active" : "disable"}
      ))
   }, [userList])

   const handleRowSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
      dispatch(setSelectedUser({id: rowSelectionModel[0] as string}))
   }

   return (
      <div className={"account-table"}>
         <DataGrid
            loading={status === "pending"}
            onRowSelectionModelChange={handleRowSelectionChange}
            density={"standard"} rows={rows ?? []} columns={columns}
            slots={{ toolbar: UserTableToolBar }}
         />
      </div>
   );
}

export default UserTable