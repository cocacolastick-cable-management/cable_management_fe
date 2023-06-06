import WithDrawHistoryResponse from "./WithDrawHistoryResponse";
import {KeyOfWithDrawStatus} from "../../constants";

type WithDrawResponse = {
   Id: string
   UniqueName: string
   SupplierId: string
   SupplierName:  string
   SupplierEmail:  string
   ContractorId: string
   ContractorName: string
   ContractorEmail: string
   ContractId: string
   ContractUniqueName: string
   CableAmount: number
   Status: KeyOfWithDrawStatus
   CreatedAt: Date
   Histories: WithDrawHistoryResponse[]
}

// type WithDrawResponse struct {
//    Id             uuid.UUID
//    SupplierId     uuid.UUID
//    SupplierName   string
//    ContractorId   uuid.UUID
//    ContractorName string
//    ContractId     uuid.UUID
//    CableAmount    uint
//    Status         string
//    CreatedAt      time.Time
//    Histories      []*HistoryResponse
// }

export default WithDrawResponse