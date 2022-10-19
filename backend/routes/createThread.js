const { Router } = require("express");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  const refreshedClient = await getRefreshClient();

  // Take the tweetdata text from request
  const { threadData } = req.query;
  const jsonData = JSON.parse(threadData);

  try {
    const data = await refreshedClient.v2.tweetThread(jsonData);
    res.json({text: "Thread Posted Successfully"});
  } catch (error) {
    res.status(403).send(error);
  }
});

module.exports = router;
