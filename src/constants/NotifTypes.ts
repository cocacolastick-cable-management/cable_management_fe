import WithDrawStatus from "./WithDrawStatus";

const NotifTypes = {
   "with_draw_request": {
      collected: {
         message: "mark",
         severity: WithDrawStatus.collected.color,
         icon: WithDrawStatus.collected.icon
      },
      new: {
         message: "create",
         severity: WithDrawStatus.new.color,
         icon: WithDrawStatus.new.icon
      },
      ready: {
         message: "ready",
         severity: WithDrawStatus.ready.color,
         icon: WithDrawStatus.ready.icon
      },
      canceled: {
         message: "canceled",
         severity: WithDrawStatus.canceled.color,
         icon: WithDrawStatus.canceled.icon
      },
   }
}


// const (
// WD_NewStatus       = "new"
// WD_ReadyStatus     = "ready"
// WD_CollectedStatus = "collected"
// WD_CanceledStatus  = "canceled"
// )


export type NotifTypesType = keyof typeof NotifTypes

export default NotifTypes