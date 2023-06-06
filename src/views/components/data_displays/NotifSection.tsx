import {Alert, Stack} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState, useRootDispatch} from "../../../stores/RootStore";
import {useEffect} from "react";
import {fetchNotifList} from "../../../stores/NotifStore";
import {NotifTypes, NotifTypesType} from "../../../constants";

function NotifSection()
{
   const dispatch = useRootDispatch()
   const {notifList, status} = useSelector((state: RootState) => state.NotifSlice)

   useEffect(() => {
      if (notifList === null) dispatch(fetchNotifList())
   }, [dispatch, notifList])

   return (
      <section className={"notif-section"}>
         <Stack spacing={1} sx={{ width: '100%', padding: 3 }}>
            {
               notifList?.map(notif => {
                  console.log(notif)
                  const type = NotifTypes[notif.ObjectType as NotifTypesType][notif.Action as keyof typeof NotifTypes.with_draw_request]
                  return <Alert
                     icon={type.icon}
                     key={notif.Id}
                     variant={notif.IsRead ? "standard" : "filled"}
                     severity={type.severity as any}><span className={"font-bold"}>{notif.SenderEmail}</span> {type.message} <span className={"font-bold"}>{notif.ObjectUniqueName}</span> as <span className={"font-bold"}>{notif.Action}</span></Alert>
               })
            }
         </Stack>

      </section>
   )
}

export default NotifSection