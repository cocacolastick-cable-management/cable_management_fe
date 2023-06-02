import * as Yup from "yup";

type CreateUserRequest = {
   Role: string
   Email: string
   DisplayName: string
}

const CreateUserRequestValidation = Yup.object().shape({
   Role: Yup.string().required('Role is required'),
   Email: Yup.string().email('Invalid email address').required('Email is required'),
   DisplayName: Yup.string().required(`Display name is required`)
});


export default CreateUserRequest
export {CreateUserRequestValidation}