const { Router } = require("express");
const { readTwitterClient } = require("../config");
const router = Router();

router.get("/", async (req, res) => {
  // Take the Username from request
  const { username } = req.query;

  // Get the user details from Twitter with username
  try {
    const data = await readTwitterClient.v2.userByUsername(username);
    res.json(data.errors ? data.errors[0].detail : data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
