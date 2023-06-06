import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete, TextField, SelectChangeEvent} from "@mui/material";
import {RootState, useRootDispatch} from "../../../../stores/RootStore";
import {useDispatch, useSelector} from "react-redux";
import {ChangeEvent, useEffect, useState} from "react";
import {addUpContractStockById, fetchPlannerContractList} from "../../../../stores/ContractTableStore";
import {fetchUserList} from "../../../../stores/UserTableStore";
import {useFormik} from "formik";
import {CreateWithDrawRequest, WithDrawResponse} from "../../../../api_schema";
import * as Yup from "yup";
import {MyAxios} from "../../../../infrastructures";
import {addWithDrawToHead} from "../../../../stores/WithDrawTableStore";

type CreateWithDrawFormDialogProps = {
   isOpen?: boolean
   handleClose?: () => void
}

function CreateWithDrawFormDialog(props: CreateWithDrawFormDialogProps)
{
   const rootDispatch = useRootDispatch()
   const dispatch = useDispatch()
   const {contractList} = useSelector((state: RootState) => state.ContractTableSlice)
   const {userList} = useSelector((state: RootState) => state.UserTableSlice)
   const [contractSelectData, setContractSelectData] = useState<contractSelectType[] | null>([])
   const [contractorSelectData, setContractorSelectData] = useState<contractorSelectType[] | null>([])

   const form = useFormik<{Contract: contractSelectType | null, Contractor: contractorSelectType | null, CableAmount: number}>({
      initialValues: {
         Contract: null,
         Contractor: null,
         CableAmount: 1
      },
      validateOnChange: false,
      validateOnBlur: true,
      validationSchema: CreateWithDrawFormValidation,
      onSubmit: values => {
         const body: CreateWithDrawRequest = {
            ContractorEmail: values.Contractor?.Email ?? "",
            ContractUniqueName: values.Contract?.UniqueName ?? "",
            CableAmount: values.CableAmount
         }
         MyAxios.post("/planner/with-draws", body)
            .then(res => {
               const withDraw = res.data.Payload as WithDrawResponse
               dispatch(addWithDrawToHead(withDraw))
               dispatch(addUpContractStockById({id: withDraw.ContractId, stock: -withDraw.CableAmount}))
               form.resetForm()
               props.handleClose && props.handleClose()
            })
            .catch(err => {
               const code = err.response.data.Code
               if (code === "IVL") {
                  const errorsRes = err.response.data.Errors as any[]
                  errorsRes.forEach((error) => {
                     console.log(error)
                     form.setFieldTouched(error.FailedField, true, false)
                     form.setFieldError(error.FailedField, error.Value)
                  })
               }
            })
      }
   })
   const { values, touched, errors, handleSubmit, handleBlur } = form;

   const handleInputChange = (e: ChangeEvent<any> | SelectChangeEvent) => {
      form.setFieldError(e.target.name, "")
      form.handleChange(e)
   };

   useEffect(() => {
      if (contractList == null) rootDispatch(fetchPlannerContractList())
      setContractSelectData(contractList?.map(contract => {
         return {
            label: `${contract.UniqueName} (stock: ${contract.Stock})`,
            UniqueName: contract.UniqueName
         }
      }) ?? null)
   }, [rootDispatch, contractList])

   useEffect(() => {
      if (userList == null) rootDispatch(fetchUserList("supplier,contractor"))
      setContractorSelectData(userList?.reduce((result, user) => {
         if (user.Role === "contractor" && user.IsActive) {
            result.push({
               label: user.Email,
               Email: user.Email
            })
         }
         return result
      }, [] as {label: string, Email: string}[]) ?? [])

   }, [rootDispatch, userList])

   // TODO: those lines look like shoot, refactor them
   return (
      <Dialog
         maxWidth={"xs"}
         fullWidth
         open={!!props.isOpen}
         onClose={props.handleClose}
      >
         <DialogTitle>Create New Request</DialogTitle>

         <DialogContent>
            <Autocomplete
               fullWidth
               options={contractSelectData ?? []}
               onBlur={handleBlur('Contract')}
               onChange={(_, value) => {
                  form.setFieldError("Contract", "")
                  form.setFieldValue("Contract", value)
               }}
               value={values.Contract}
               renderInput={(params) =>
                  <TextField {...params}
                    onBlur={handleBlur('Contract')}
                    name={"Contract"} id={"Contract"}
                    helperText={touched.Contract && errors.Contract}
                    error={!!(touched.Contract && errors.Contract)}
                    margin={"normal"} label="Contract" />}
            />
            <Autocomplete
               fullWidth
               options={contractorSelectData ?? []}
               onBlur={handleBlur('Contractor')}
               onChange={(_, value) => {
                  form.setFieldError("Contractor", "")
                  form.setFieldValue("Contractor", value)
               }}
               value={values.Contractor}
               renderInput={(params) =>
                  <TextField {...params}
                     onBlur={handleBlur('Contractor')}
                     name={"Contractor"} id={"Contractor"}
                     helperText={touched.Contractor && errors.Contractor}
                     error={!!(touched.Contractor && errors.Contractor)}
                     margin={"normal"} label="Contractor" />}
            />
            <TextField
               error={!!(touched.CableAmount && errors.CableAmount)}
               helperText={touched.CableAmount && errors.CableAmount}
               name={"CableAmount"} value={values.CableAmount}
               onBlur={handleBlur} onChange={handleInputChange}
               margin={"normal"} fullWidth type={"number"} label={"CableAmount"}
            />
         </DialogContent>

         <DialogActions>
            <Button onClick={props.handleClose} color="secondary">
               Cancel
            </Button>
            <Button onClick={() => handleSubmit()} color="primary">
               Submit
            </Button>
         </DialogActions>
      </Dialog>
   )
}

const CreateWithDrawFormValidation = Yup.object().shape({
   CableAmount: Yup.number().min(1, "amount is invalid").required('amount is required'),
   Contract: Yup.object().required().shape({
      label: Yup.string().required('label is required'),
      UniqueName: Yup.string().required('Contract is required'),
   }),
   Contractor: Yup.object().required().shape({
      label: Yup.string().required(`label is required`),
      Email: Yup.string().email(`contractor is required`)
   })
});

type contractSelectType = {label: string, UniqueName: string}
type contractorSelectType = {label: string, Email: string}

export default CreateWithDrawFormDialog