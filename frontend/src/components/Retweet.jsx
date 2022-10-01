import React, { useRef, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { backendUrl } from "../constants/constant";

const Retweet = () => {
  const [tweetId, setTweetId] = useState("");
  const [previewTweetText, setPreviewTweetText] = useState("");
  const [retweetLoading, setRetweetLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const tweetIdRef = useRef();


  const retweet = async () => {
    if (tweetIdRef.current.value.length < 5) {
      toast.warn("Please enter valid Tweet ID!");
      return;
    }
    setRetweetLoading(true);
    fetch(backendUrl + "/retweet?id=" + tweetId)
      .then((res) => {
        res.json();
        toast.success("Retweeted Successfully");
      })
      .catch((err) => {
        toast.error("Something went Wrong 😔");
      })
      .finally(() => {
        setRetweetLoading(false);
      });
  };

  const previewTweet = () => {
    if (tweetIdRef.current.value.length < 5) {
      toast.warn("Please enter valid Tweet ID");
      return;
    }
    setPreviewTweetText("");
    setPreviewLoading(true);
    fetch(backendUrl + "/getTweet?id=" + tweetId)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          console.log("success" + res.data);
          setPreviewTweetText(res.data.text);
          toast.success("Tweet exist!");
        } else if (res.errors) {
          toast.error("Tweet don't exist!");
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong 😔");
        console.log(err);
      })
      .finally(() => {
        setPreviewLoading(false);
      });
  };
  return (
    <>
      <label>
        Tweet Id :{" "}
        <input
          type="number"
          className="p-2 w-56 border-2 border-black rounded-lg"
          onChange={(e) => setTweetId(e.target.value)}
          ref={tweetIdRef}
        />
        <span onClick={previewTweet} className="px-2 cursor-pointer">
          {previewLoading ? <ClipLoader color="white" size={20} /> : "Preview"}
        </span>
      </label>

      {previewTweetText}
      {retweetLoading ? (
        <div className="text-center">
          <BeatLoader color="white" />
        </div>
      ) : (
        <button
          className="shadow-slate-600/40 shadow-lg bg-white text-blue-500 font-bold rounded-lg p-2"
          onClick={() => retweet()}
        >
          Retweet Tweet
        </button>
      )}
    </>
  );
};

export default Retweet;
