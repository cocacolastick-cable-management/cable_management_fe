import {ColorType} from "../types";

const Roles = Object.freeze({
   "admin": {
      value: "admin",
      color: "info"  as ColorType,
      mainRoute: "/admin/dashboard"
   },
   "planner": {
      value: "planner",
      color: "primary" as ColorType,
      mainRoute: "/planner/dashboard"
   },
   "supplier": {
      value: "supplier",
      color: "success" as ColorType,
      mainRoute: "/supplier/dashboard"
   },
   "contractor": {
      value: "contractor",
      color: "secondary" as ColorType,
      mainRoute: "/contractor/dashboard"
   },
})

// const Roles = new Map([
//    ["admin", {
//       value: "admin",
//       color: "info"  as Color,
//       mainRoute: "/admin/dashboard"
//    }],
//    ["planner", {
//       value: "planner",
//       color: "primary" as Color,
//       mainRoute: "/planner/dashboard"
//    }],
//    ["supplier", {
//       value: "supplier",
//       color: "success" as Color,
//       mainRoute: "/supplier/dashboard"
//    }],
//    ["contractor", {
//       value: "contractor",
//       color: "secondary" as Color,
//       mainRoute: "/contractor/dashboard"
//    }]
// ])

export default Roles