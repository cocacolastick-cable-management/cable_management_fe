function formatFriendlyDatetime(datetime: Date): string
{
   const currentTime = new Date();
   const targetTime = new Date(datetime);

   const timeDifference = targetTime.getTime() - currentTime.getTime();
   const seconds = Math.floor(timeDifference / 1000);
   const secondsAbs = Math.abs(seconds)

   if (secondsAbs < 60) {
      return `${seconds} seconds ${seconds < 0 ? "ago" : "from now"}`;
   } else if (secondsAbs < 3600) {
      const minutes = Math.floor(secondsAbs / 60);
      return `${minutes} minutes ${seconds < 0 ? "ago" : "from now"}`;
   } else if (secondsAbs < 86400) {
      const hours = Math.floor(secondsAbs / 3600);
      return `${hours} hours ${seconds < 0 ? "ago" : "from now"}`;
   } else {
      const days = Math.floor(secondsAbs / 86400);
      return `${days} days ${days < 0 ? "ago" : "from now"}`;
   }
}

export default formatFriendlyDatetime