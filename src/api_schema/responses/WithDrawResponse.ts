import WithDrawHistoryResponse from "./WithDrawHistoryResponse";

type WithDrawResponse = {
   Id: string
   SupplierId: string
   SupplierName:  string
   SupplierEmail:  string
   ContractorId: string
   ContractorName: string
   ContractorEmail: string
   ContractId: string
   CableAmount: number
   Status: string
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