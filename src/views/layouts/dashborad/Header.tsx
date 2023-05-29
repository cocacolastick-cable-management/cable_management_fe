import {Logo} from "../../components"
import UserInfo from "./UserInfo"
import HeaderMenu from "./HeaderMenu"

function Header()
{
   return (
      <header className={"page-header"}>
         <Logo/>
         <div className={"page-header--right"}>
            <UserInfo/>
            <div className={"page-header--right__line"}></div>
            <HeaderMenu/>
         </div>
      </header>
   )
}

export default Header