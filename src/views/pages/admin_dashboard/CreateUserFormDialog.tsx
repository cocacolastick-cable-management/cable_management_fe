import {Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, SelectChangeEvent, TextField} from "@mui/material";
import {ChangeEvent} from "react";
import {Roles} from "../../../constants";
import {Select} from "../../base_components";
import {useFormik} from "formik";
import {CreateUserRequest, CreateUserRequestValidation} from "../../../api_schema";
import {MyAxios} from "../../../infrastructures";
import {useDispatch} from "react-redux";
import {addUserToHead} from "../../../stores/UserTableStore";

type CreateUserFormDialogProps = {
   isOpen?: boolean
   handleClose?: () => void
}

function CreateUserFormDialog(props: CreateUserFormDialogProps)
{
   const dispatch = useDispatch()
   const form = useFormik<CreateUserRequest>({
      initialValues: {
         Role: "",
         Email: "",
         DisplayName: ""
      },
      validationSchema: CreateUserRequestValidation,
      validateOnChange: false,
      validateOnBlur: true,
      onSubmit: values => {
         MyAxios.post("/admin/users", values)
            .then((res) => {
               dispatch(addUserToHead(res.data.Payload))
               form.resetForm()
               props.handleClose && props.handleClose()
            })
            .catch((err) => {
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

   return (
      <Dialog
         maxWidth={"xs"}
         color={"accentColor"}
         open={!!props.isOpen}
         onClose={props.handleClose}
      >
         <DialogTitle>Create New Account</DialogTitle>

         <DialogContent>
            <Select
               fullWidth margin="normal"
               error={!!(touched.Role && errors.Role)}
               helperText={touched.Role && errors.Role}
               name={"Role"} value={values.Role}
               onChange={handleInputChange} onBlur={handleBlur}
               renderOptions={renderRoleSelect} label={"Role"} required/>
            <TextField
               sx={{ width: '100%' }} fullWidth margin="normal"
               error={!!(touched.Email && errors.Email)}
               helperText={touched.Email && errors.Email}
               label={"Email"} name={"Email"} value={values.Email}
               onBlur={handleBlur} onChange={handleInputChange}
               type={"email"} required/>
            <TextField
               sx={{ width: '100%' }} fullWidth margin="normal"
               error={!!(touched.DisplayName && errors.DisplayName)}
               helperText={touched.DisplayName && errors.DisplayName}
               label={"DisplayName"} name={"DisplayName"} value={values.DisplayName}
               onBlur={handleBlur} onChange={handleInputChange} required/>
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

const renderRoleSelect = () => {
   return roleSelectData.map((option, index) => (
      <MenuItem key={index} value={option.value}>
         <Chip
            className={"user-info--top__role"} label={option.value}
            color={option.color} variant="outlined" size={"small"}
         />
      </MenuItem>
   ))
}


const roleSelectData = Object.values(Roles).map((role, index) => ({
   id: index,
   value: role.value,
   color: role.color
}))

export default CreateUserFormDialog