import {Chip, MenuItem} from "@mui/material"
import {Color} from "../../../types"

type ChipSelectOptionProps = {
   key: any,
   value?: any,
   chipColor?: Color
}

// TODO: why this shit does not work???
function ChipSelectOption(props: ChipSelectOptionProps)
{
   return (
      <MenuItem key={props.key} value={props.value}>
         <Chip
            className={"user-info--top__role"} label={props.value}
            color={props.chipColor} variant="outlined" size={"small"}
         />
      </MenuItem>
   )
}

export default ChipSelectOption