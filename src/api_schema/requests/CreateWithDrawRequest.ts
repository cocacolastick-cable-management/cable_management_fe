import * as Yup from "yup";

type CreateWithDrawRequest = {
   CableAmount: number
   ContractUniqueName: string
   ContractorEmail: string
}

const CreateWithDrawRequestValidation = Yup.object().shape({
   CableAmount: Yup.number().min(1, "amount is invalid").required('amount is required'),
   ContractUniqueName: Yup.string().required('contract is required'),
   ContractorEmail: Yup.string().email(`contractor is required`)
});

export default CreateWithDrawRequest
export {CreateWithDrawRequestValidation}