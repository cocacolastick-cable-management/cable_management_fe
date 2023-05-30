import * as Yup from "yup"

type SignInRequest = {
   Role: string
   Email: string
   Password: string
}

const SignInRequestValidation = Yup.object().shape({
   Role: Yup.string().required('Role is required'),
   Email: Yup.string().email('Invalid email address').required('Email is required'),
   Password: Yup.string().required('Password is required')
});

export default SignInRequest
export {SignInRequestValidation}