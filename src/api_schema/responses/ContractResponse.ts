type ContractResponse = {
   Id: string
   UniqueName: string
   SupplierId: string
   SupplierName: string
   SupplierEmail: string
   CableAmount: number
   Stock: number
   StartDay: Date
   EndDay: Date
   CreatedAt:Date
}

// type ContractResponse struct {
//    Id            uuid.UUID
//    UniqueName    string
//    SupplierId    uuid.UUID
//    SupplierName  string
//    SupplierEmail string
//    CableAmount   uint
//    Stock         int
//    StartDay      time.Time
//    EndDay        time.Time
//    CreatedAt     time.Time
// }

export default ContractResponse