import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete, TextField} from "@mui/material";
import {RootState, useRootDispatch} from "../../../../stores/RootStore";
import {useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {fetchPlannerContractList} from "../../../../stores/ContractTableStore";

type CreateWithDrawFormDialogProps = {
   isOpen?: boolean
   handleClose?: () => void
}

function CreateWithDrawFormDialog(props: CreateWithDrawFormDialogProps)
{
   const dispatch = useRootDispatch()
   const {contractList} = useSelector((state: RootState) => state.ContractTableSlice)
   const [contractSelectData, setContractSelectData] = useState<{label: string, UniqueName: string}[] | null>([])

   useEffect(() => {
      if (contractList == null) dispatch(fetchPlannerContractList())
      setContractSelectData(contractList?.map(contract => {
         return {
            label: `${contract.UniqueName} (stock: ${contract.Stock})`,
            UniqueName: contract.UniqueName
         }
      }) ?? null)
   }, [dispatch, contractList])

   return (
      <Dialog
         maxWidth={"xs"}
         fullWidth
         open={!!props.isOpen}
         onClose={props.handleClose}
      >
         <DialogTitle>Create New Request</DialogTitle>
         <DialogContent>
            <Autocomplete
               fullWidth
               options={contractSelectData ?? []}
               renderInput={(params) => <TextField {...params} margin={"normal"} label="Contract" />}
            />
            <Autocomplete
               fullWidth
               options={top100Films}
               renderInput={(params) => <TextField {...params} margin={"normal"} label="Supplier" />}
            />
            <TextField
               margin={"normal"}
               fullWidth
               type={"number"}
               label={"CableAmount"}
            />
         </DialogContent>
         <DialogActions>
            <Button onClick={props.handleClose} color="secondary">
               Cancel
            </Button>
            <Button color="primary">
               Submit
            </Button>
         </DialogActions>
      </Dialog>
   )
}

export default CreateWithDrawFormDialog

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
   'contract-1',
]