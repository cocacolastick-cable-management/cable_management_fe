import {Button, TextField, Chip, MenuItem, SelectChangeEvent} from "@mui/material"
import {Select} from "../../base_components"
import {Roles} from "../../../constants"
import {ChangeEvent} from "react"
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik"
import {AuthResponse, SignInRequest, SignInRequestValidation} from "../../../api_schema"
import {MyAxios} from "../../../infrastructures"
import {setAuthData} from "../../../stores/AuthStore";
import {useDispatch} from "react-redux";

function SignInForm()
{
   const navigate = useNavigate()
   const dispatch = useDispatch()

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
         MyAxios.post("/sign-in", values)
            .then((res) => {
               dispatch(setAuthData(res.data.Payload as AuthResponse))
               navigate(Roles[values.Role as keyof typeof Roles].mainRoute, {replace: true})
            })
            .catch((err) => {
               switch (err.response.status) {
                  case 401:
                     form.setFieldError("Email", "Authenticate Failed")
                     form.setFieldError("Password", "Authenticate Failed")
                     break
                  case 403:
                     form.setFieldError("Role", "You have been blocked")
                     break
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
      <form className={"sign-in-form"}>
         <Select
            error={!!(touched.Role && errors.Role)}
            helperText={touched.Role && errors.Role}
            name={"Role"} value={values.Role}
            onChange={handleInputChange} onBlur={handleBlur} renderOptions={renderRoleSelect}
            label={"Role"} required/>
         <TextField
            error={!!(touched.Email && errors.Email)}
            helperText={touched.Email && errors.Email}
            name={"Email"} value={values.Email}
            onBlur={handleBlur} onChange={handleInputChange} label={"Email"}
            type={"email"} required/>
         <TextField
            error={!!(touched.Password && errors.Password)}
            helperText={touched.Password && errors.Password}
            name={"Password"} value={values.Password}
            onBlur={handleBlur} onChange={handleInputChange} label={"Password"} required/>
         <Button
            onClick={() => handleSubmit()}
            variant={"contained"} size={"large"}>
            Sign In
         </Button>
      </form>
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

export default SignInForm