import {Timeline, timelineItemClasses} from '@mui/lab';
import {Button, Chip} from '@mui/material';
import {WithDrawResponse} from "../../../../api_schema";
import {formatFriendlyDatetime, formatDatetime} from "../../../../utils";
import {WithDrawStatus} from "../../../../constants";
import {useEffect, useState} from "react";
import {MyAxios} from "../../../../infrastructures";
import UpdateWithDrawStatusRequest from "../../../../api_schema/requests/UpdateWithDrawStatusRequest";
import {useDispatch} from "react-redux";
import {updateWithDrawById} from "../../../../stores/WithDrawTableStore";
import {setSelectedWithDraw} from "../../../../stores/PlannerDashBoardStore";
import {addUpContractStockById} from "../../../../stores/ContractTableStore";
import {HistoryItem} from "../../../components";
import { ConfirmDialog } from '../../../base_components';

type WithDrawPreviewProps = {
   data: WithDrawResponse
}

function WithDrawPreview(props: WithDrawPreviewProps)
{
   const dispatch = useDispatch()
   // const {withDrawList} = useSelector((state: RootState) => state.WithDrawTableSlice)

   const [status, setStatus] = useState(WithDrawStatus[props.data.Status])
   const [open, setOpen] = useState(false);
   const [withDrawId, setWithDrawId] = useState('')

   useEffect(() => {
      setStatus(WithDrawStatus[props.data.Status])
   }, [props.data.Status])

   useEffect(() => {
      setWithDrawId(props.data.Id)
   }, [props.data.Id])

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleCancelWithDraw = () => {
      setOpen(false);
      const data: UpdateWithDrawStatusRequest = {
         NewStatus: "canceled"
      }
      setWithDrawId((pre) => {
         MyAxios.patch(`/common/with-draws/${pre}`, data)
            .then((res) => {
               const withDraw = res.data.Payload as WithDrawResponse
               dispatch(setSelectedWithDraw(withDraw))
               dispatch(updateWithDrawById({id: withDraw.Id, withDraw: withDraw}))
               dispatch(addUpContractStockById({id: withDraw.ContractId, stock: withDraw.CableAmount}))
            })
            .catch((err) => {
               dispatch(updateWithDrawById({id: props.data.Id, withDraw: err.response.data.Payload}))
            })
         return pre
      })
   }

   return (
      <section className={"with-draw-preview"}>

         <section className={"flex flex-col gap-3 font-medium"}>
            <div>status: <Chip label={status.value} color={status.color} variant="outlined" size={"small"}/></div>
            <div>contract: {props.data.ContractUniqueName}</div>
            <div>request amount: {props.data.CableAmount}</div>
            <div>supplier: {props.data.SupplierEmail}</div>
            <div>contractor: {props.data.ContractorEmail}</div>
            <div>created at: {formatDatetime(props.data.CreatedAt)} ({formatFriendlyDatetime(props.data.CreatedAt)})</div>
         </section>

         <hr className={"my-8 border-none h-[1px] bg-gray-500"}/>

         <div className={"overflow-y-auto"}>
            <p className={"font-bold text-2xl capitalize mb-2"}>History:</p>
            <Timeline sx={{[`& .${timelineItemClasses.root}:before`]: {flex: 0,padding: 0,}, paddingX: 1}}>
               {props.data.Histories.map((history, _) => <HistoryItem
                  key={history.Id} historyId={history.Id} status={history.Status} creatorEmail={history.CreatorEmail} createdAt={history.CreatedAt}/>)}
            </Timeline>
            {props.data.Histories[props.data.Histories.length - 1].Status === "new"
               && <Button onClick={handleClickOpen} sx={{marginTop: 2}}>cancel this request?</Button>}
            <ConfirmDialog title={"Delete the request"} isOpen={open} handleClose={handleClose} handleSubmit={handleCancelWithDraw}/>
         </div>

      </section>
   )
}

export default WithDrawPreview