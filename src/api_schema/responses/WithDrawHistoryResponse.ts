import {KeyOfWithDrawStatus} from "../../constants";

type WithDrawHistoryResponse = {
   Id: string
   CreatorId: string
   CreatorName: string
   CreatorEmail: string
   CreatorRole: string
   CreatedAt: Date
   Status: KeyOfWithDrawStatus
   Action: string
}

// type HistoryResponse struct {
//    CreatorId    uuid.UUID
//    CreatorName  string
//    CreatorEmail string
//    CreatorRole  string
//    CreatedAt    time.Time
//    Status       string
//    Action       string
// }

export default WithDrawHistoryResponse