const { Router } = require("express");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  
  const { text, scheduleDate } = req.query;
  console.log("Scheduled Tweet " + scheduleDate);
  // const scheduleDate = '9/27/2022, 7:24:10 AM'
  const scheduledDate = new Date(scheduleDate)
  const currentDate = new Date()
  if(scheduledDate > currentDate){
    res.send("Please Enter Valid Date")
    return
  } 
  const scheduletweet = async () => {
    const refreshedClient = await getRefreshClient();
    const { data } = await refreshedClient.v2.tweet(text);
  };
  
  const schedule = setInterval(() => {
    const nDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    });
    if (scheduleDate === nDate) {
      scheduletweet();
      clearInterval(schedule);
    }
  }, 1000);
  res.send("Your tweet has scheduled on " + scheduleDate);
});

module.exports = router;
