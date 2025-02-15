import {parseISO, formatDistanceToNow} from 'date-fns';
 
function TimeStamp( {timeStamp }) {
    let timeAgo = '';
    if(timeStamp) {
        const date = parseISO(timeStamp);
        const timePeriod = formatDistanceToNow(date);

        console.log("Date is : ",date);
        console.log("Time Period is ",timePeriod);
        console.log("Time stamp is : ",timeStamp);

        timeAgo = `${timePeriod} ago`
    }


  return (
    <span title={timeStamp}>
    &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export default TimeStamp
