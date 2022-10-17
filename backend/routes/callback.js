const { Router } = require("express");
const { twitterClient, supabase, callbackURL } = require("../config");
const router = Router();

router.get("/", async (req, res) => {
  // take the state and code-verifier token from the auth callback url
  const { state, code } = req.query;

  // get the state and codeverifier token from DB
  const { data: states, error } = await supabase
    .from("states")
    .select("*")
    .single();
  const { statecode, code_verifier } = states;
  console.log(states);

  // Check the state from url and state from DB match
  if (state !== statecode) {
    return res.status(400).send("Stored tokens didn't match!");
  }

  // Generate accessToken and refreshToken by logging with the state and verifier codes
  const {
    client: loggedClient,
    accessToken,
    refreshToken,
  } = await twitterClient.loginWithOAuth2({
    code,
    codeVerifier: code_verifier,
    redirectUri: callbackURL,
  });

  // Store the accessToken and refreshToken to DB
  const { data: updatedData, error: error1 } = await supabase
    .from("tokens")
    .update({ Access_tokens: accessToken, Refresh_Tokens: refreshToken })
    .eq("id", "1")
    .single();

  console.log(updatedData);

  const { data } = await loggedClient.v2.me();

  res.send(data);
});

module.exports = router;
