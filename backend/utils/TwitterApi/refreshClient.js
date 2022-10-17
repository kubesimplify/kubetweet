const { supabase, twitterClient } = require("../../config");

const getRefreshClient = async () => {
  // take the old accessToken and refreshToken from DB
  let { data: tokens, error } = await supabase
    .from("tokens")
    .select("*")
    .single();
  const { Refresh_Tokens } = tokens;

  // Generate new Refresh token using old refresh token
  const {
    client: refreshedClient,
    accessToken,
    refreshToken: newRefreshToken,
  } = await twitterClient.refreshOAuth2Token(Refresh_Tokens);

  // Update the refresh accessToken and newRefreshToken in DB
  const { data: updatedData, error: error1 } = await supabase
    .from("tokens")
    .update({ Access_tokens: accessToken, Refresh_Tokens: newRefreshToken })
    .eq("id", "1")
    .single();

  return refreshedClient;
};

module.exports = getRefreshClient