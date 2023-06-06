// type NotifResponse struct {
//    Id               uuid.UUID
//    Action           string
//    Message          string
//    IsRead           bool
//    ObjectType       string
//    ObjectUniqueName string
//    SenderEmail      string
//    ObjectId         uuid.UUID
//    SenderId         uuid.UUID
//    ReceiverId       uuid.UUID
//    CreatedAt        time.Time
// }

type NotifResponse = {
   Id: string
   Action: string
   Message: string
   IsRead: boolean
   ObjectType: string
   ObjectUniqueName: string
   SenderEmail: string
   ObjectId: string
   SenderId: string
   ReceiverId: string
   CreatedAt: Date
}

export default NotifResponse