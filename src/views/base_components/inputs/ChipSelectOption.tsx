import {Chip, MenuItem} from "@mui/material"
import {ColorType} from "../../../types"

type ChipSelectOptionProps = {
   key: any,
   value?: any,
   chipColor?: ColorType
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