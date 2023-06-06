import {TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";
import {Box, Chip} from "@mui/material";
import {formatDatetime} from "../../../utils";
import {KeyOfWithDrawStatus, WithDrawStatus} from "../../../constants";

type HistoryItemProps = {
   historyId: string
   status: KeyOfWithDrawStatus
   createdAt: Date
   creatorEmail: string
}

function HistoryItem(props: HistoryItemProps)
{
   const historyStatus = WithDrawStatus[props.status]
   return (
      <TimelineItem key={props.historyId}>
         <TimelineSeparator>
            <TimelineConnector/>
            <TimelineDot color={historyStatus.color as any}>
               {historyStatus.icon}
            </TimelineDot>
            <TimelineConnector />
         </TimelineSeparator>
         <TimelineContent sx={{ py: '20px', px: 2 }}>
            <Box>
               <Chip label={historyStatus.value} color={historyStatus.color} variant="outlined" size={"small"}/>
               <span className={"text-xs ml-2 text-gray-300"}>{formatDatetime(props.createdAt)}</span>
            </Box>
            <span className={"font-bold"}>{props.creatorEmail}</span>
         </TimelineContent>
      </TimelineItem>
   )
}

export default HistoryItem