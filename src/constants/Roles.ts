import {Color} from "../types";

const Roles = Object.freeze({
   admin: {
      value: "admin",
      color: "info"  as Color
   },
   planner: {
      value: "planner",
      color: "primary" as Color
   },
   supplier: {
      value: "supplier",
      color: "success" as Color
   },
   contractor: {
      value: "contractor",
      color: "secondary" as Color
   },
})

export default Roles