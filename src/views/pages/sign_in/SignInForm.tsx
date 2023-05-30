import {Button, TextField, Chip, MenuItem} from "@mui/material"
import {Select} from "../../base_components"
import {Roles} from "../../../constants"
import {useCallback} from "react"
import {useFormik} from "formik"
import {SignInRequest, SignInRequestValidation} from "../../../api_schema"

function SignInForm()
{
   const form = useFormik<SignInRequest>({
      initialValues: {
         Role: "",
         Email: "",
         Password: ""
      },
      validationSchema: SignInRequestValidation,
      validateOnChange: false,
      validateOnBlur: true,
      onSubmit: values => {
         // TODO call sign-in api then set AuthSlice
         console.log(values)
      }
   })
   const { values, touched, errors, handleChange, handleSubmit, handleBlur } = form;

   const renderRoleSelect = useCallback(() => {
      return roleSelectData.map((option, index) => (
         <MenuItem key={index} value={option.value}>
            <Chip
               className={"user-info--top__role"} label={option.value}
               color={option.color} variant="outlined" size={"small"}
            />
         </MenuItem>
      ))
   }, [])

   return (
      <form className={"sign-in-form"}>
         <Select
            error={!!(touched.Role && errors.Role)}
            helperText={touched.Role && errors.Role}
            name={"Role"} value={values.Role}
            onChange={handleChange} onBlur={handleBlur} renderOptions={renderRoleSelect}
            label={"Role"} required/>
         <TextField
            error={!!(touched.Email && errors.Email)}
            helperText={touched.Email && errors.Email}
            name={"Email"} value={values.Email}
            onBlur={handleBlur} onChange={handleChange} label={"Email"}
            type={"email"} required/>
         <TextField
            error={!!(touched.Password && errors.Password)}
            helperText={touched.Password && errors.Password}
            name={"Password"} value={values.Password}
            onBlur={handleBlur} onChange={handleChange} label={"Password"} required/>
         <Button
            onClick={() => handleSubmit()}
            variant={"contained"} size={"large"}>
            Sign In
         </Button>
      </form>
   )
}

const roleSelectData = Object.values(Roles).map((role, index) => ({
   id: index,
   value: role.value,
   color: role.color
}))

export default SignInForm