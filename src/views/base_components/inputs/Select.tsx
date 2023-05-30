import {FormControl, InputLabel, Select as MuiSelect, SelectChangeEvent, FormHelperText} from "@mui/material"
import {ReactNode} from "react"
import * as React from "react";

type SelectProps = {
   label?: string
   value?: any
   onChange?: (event: SelectChangeEvent) => void
   onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
   required?: boolean
   renderOptions?: () => ReactNode
   helperText?: ReactNode
   name?: string
   id?: string
   error?: boolean
}

type SelectOptionType = {
   id: any,
   value: any
}

function Select(props: SelectProps)
{
   return (
      <FormControl error={props.error}>
         <InputLabel required={props.required} id="demo-simple-select-label">{props.label}</InputLabel>
         <MuiSelect
            name={props.name}
            id={props.id}
            value={props.value ?? ""}
            label={props.label}
            onChange={props.onChange}
            onBlur={props.onBlur}
         >
            {props.renderOptions && props.renderOptions()}
         </MuiSelect>
         <FormHelperText>{props.helperText}</FormHelperText>
      </FormControl>
   );
}

export default Select

export {type SelectOptionType}