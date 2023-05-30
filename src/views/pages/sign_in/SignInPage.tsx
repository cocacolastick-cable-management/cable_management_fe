import SignInForm from "./SignInForm";
import {Link} from "@mui/material";

function SignInPage()
{
   return (
      <div className={"sign-in-page"}>
         <div className={"sign-in-page--inner"}>

            <div className={"sign-in-page__header"}>
               <p className={"sign-in-page__header__title"}>sign in</p>
               <Link component="button" variant="body2">forgot password?</Link>
            </div>

            <SignInForm/>

         </div>
      </div>
   )
}

export default SignInPage