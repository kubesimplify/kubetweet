const { Router } = require("express");
const { twitterAccountId } = require("../config");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {

    const refreshedClient = await getRefreshClient();
  // Take the User Id from request
  const { targetUserId } = req.query;

  // unfollow with UserId
  try {
    const { data } = await refreshedClient.v2.unfollow(
      twitterAccountId,
      targetUserId
    );
      res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error.data.errors[0].message);
  }
});

module.exports = router;