import NewReleasesIcon from '@mui/icons-material/NewReleases';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ChecklistIcon from '@mui/icons-material/Checklist';
import NoCrashIcon from '@mui/icons-material/NoCrash';

import {ColorType} from "../types";

const WithDrawStatus = Object.freeze({
   "new": {
      value: "new",
      color: "warning" as ColorType,
      icon: <NewReleasesIcon fontSize={"small"} />
   },
   "ready": {
      value: "ready",
      color: "success" as ColorType,
      icon: <ChecklistIcon fontSize={"small"} />
   },
   "collected": {
      value: "collected",
      color: "primary" as ColorType,
      icon: <NoCrashIcon fontSize={"small"} />
   },
   "canceled": {
      value: "canceled",
      color: "error" as ColorType,
      icon: <DoDisturbIcon fontSize={"small"} />
   },
})

type KeyOfWithDrawStatus = keyof typeof WithDrawStatus

export default WithDrawStatus
export {type KeyOfWithDrawStatus}