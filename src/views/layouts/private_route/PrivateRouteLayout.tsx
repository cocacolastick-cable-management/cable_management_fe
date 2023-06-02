import {Outlet, Navigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {RootState} from "../../../stores/RootStore"

function PrivateRouteLayout()
{
   // const dispatch = useDispatch()
   const isAuth = useSelector((state: RootState) => state.AuthSlice.isAuth)
   const authData = useSelector((state: RootState) => state.AuthSlice.authData)

   // useEffect(() => {
   //    dispatch(fetchAuthDataFromLocal())
   // }, [dispatch])

   if (!isAuth && !authData.Role) {
      return <Navigate to={"/sign-in"} replace/>
   }

   return (
      <Outlet/>
   )
}

export default PrivateRouteLayout