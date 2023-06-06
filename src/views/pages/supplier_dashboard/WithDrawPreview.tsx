import {WithDrawResponse} from "../../../api_schema";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {Roles, WithDrawStatus} from "../../../constants";
import {Button} from "@mui/material";
import {ConfirmDialog} from "../../base_components";
import {Timeline, timelineItemClasses} from "@mui/lab";
import {HistoryItem} from "../../components";
import UpdateWithDrawStatusRequest from "../../../api_schema/requests/UpdateWithDrawStatusRequest";
import {MyAxios} from "../../../infrastructures";
import {setSelectedWithDraw} from "../../../stores/PlannerDashBoardStore";
import {updateWithDrawById} from "../../../stores/WithDrawTableStore";
import {addUpContractStockById} from "../../../stores/ContractTableStore";
import {RootState} from "../../../stores/RootStore";

type WithDrawPreviewProps = {
   data: WithDrawResponse
}

function WithDrawPreview(props: WithDrawPreviewProps)
{
   const dispatch = useDispatch()
   const {authData} = useSelector((state: RootState) => state.AuthSlice)
   // const {authData} = useSelector((state: RootState) => state.PlannerDashBoardSlice)
   const [open, setOpen] = useState(false);
   const [submitBtnState, setSubmitBtnState] = useState<any>({})
   const [withDrawId, setWithDrawId] = useState('')

   useEffect(() => {
      if (authData.Role === "supplier") {
         setSubmitBtnState({
            title: "Confirm Ready",
            handleSubmit: handleConfirmReady
         })
      } else if (authData.Role === "contractor") {
         setSubmitBtnState({
            title: "Confirm Collected",
            handleSubmit: handleConfirmCollected
         })
      }
   }, [authData.Role])

   useEffect(() => {
      setWithDrawId(props.data.Id)
   }, [props.data.Id])

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleConfirmReady = () => {
      const data: UpdateWithDrawStatusRequest = {
         NewStatus: "ready"
      }
      setWithDrawId((pre) => {
         handleUpdateWithDrawStatus(pre, data)
         return pre
      })
      setOpen(false);
   }

   const handleConfirmCollected = () => {
      const data: UpdateWithDrawStatusRequest = {
         NewStatus: "collected"
      }
      setWithDrawId((pre) => {
         handleUpdateWithDrawStatus(pre, data)
         return pre
      })
      setOpen(false);
   }

   const handleUpdateWithDrawStatus = (id: string,data: UpdateWithDrawStatusRequest) => {
      console.log(id)
      // TODO: this code is duplicated, think a way to handle it
      MyAxios.patch(`/common/with-draws/${id}`, data)
         .then((res) => {
            const withDraw = res.data.Payload as WithDrawResponse
            dispatch(setSelectedWithDraw(withDraw))
            dispatch(updateWithDrawById({id: withDraw.Id, withDraw: withDraw}))
            dispatch(addUpContractStockById({id: withDraw.ContractId, stock: withDraw.CableAmount}))
         })
         .catch((err) => {
            dispatch(updateWithDrawById({id: withDrawId, withDraw: err.response.data.Payload}))
         })
   }

   return (
      <section>
         <div className={"overflow-y-auto"}>
            <p className={"font-bold text-2xl capitalize mb-2"}>History:</p>
            <Timeline sx={{[`& .${timelineItemClasses.root}:before`]: {flex: 0,padding: 0,}, paddingX: 1}}>
               {props.data.Histories.map((history, _) => <HistoryItem
                  key={history.Id} historyId={history.Id} status={history.Status} creatorEmail={history.CreatorEmail} createdAt={history.CreatedAt}/>)}
            </Timeline>
            {
               props.data.Histories[props.data.Histories.length - 1].Status === "new" && authData.Role === "supplier"
               && <Button onClick={handleClickOpen} sx={{marginTop: 2}} variant={"contained"} color={WithDrawStatus.ready.color as any}>Confirm Ready!</Button>
            }
            {
               props.data.Histories[props.data.Histories.length - 1].Status === "ready" && authData.Role === "contractor"
               && <Button onClick={handleClickOpen} sx={{marginTop: 2}} variant={"contained"} color={WithDrawStatus.collected.color as any}>Confirm Collected!</Button>
            }
            <ConfirmDialog title={submitBtnState.title} isOpen={open} handleClose={handleClose} handleSubmit={submitBtnState.handleSubmit}/>
         </div>
      </section>
   )
}

export default WithDrawPreview