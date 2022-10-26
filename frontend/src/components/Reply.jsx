import React from "react";
import { useRef } from "react";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { backendUrl } from "../constants/constant";

const Reply = () => {
  const [replyText, setReplyText] = useState();
  const [previewLoading, setPreviewLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState();
  const [previewTweetText, setPreviewTweetText] = useState("");
  const textareaRef = useRef();
  const tweetIdRef = useRef();
  const screenWidth = window.innerWidth > 425;

  const onChangeText = (e) => {
    setReplyText(e.target.value);
    resizeTextArea();
  };

  const resizeTextArea = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + 5 + "px";
  };

  const replyTweet = () => {
    if (textareaRef.current.value.length < 5) {
      toast.warn("Length of tweet is too short.");
      return;
    }
    setReplyLoading(true);
    const text = encodeURIComponent(replyText);
    const tweetId = tweetIdRef.current.value;

    fetch(`${backendUrl}/reply?targetTweetId=${tweetId}&replyText=${text}`)
      .then((res) => res.json())
      .then((res) => {
        toast.success("Replied Successfully");
        setPreviewTweetText("")
      })
      .catch((err) => {
        toast.error("Something went Wrong 😔");
      })
      .finally(() => {
        setReplyLoading(false);
      });
  };

  const previewTweet = () => {
    if (tweetIdRef.current.value.length < 5) {
      toast.warn("Please enter valid Tweet ID");
      return;
    }
    setPreviewTweetText("");
    setPreviewLoading(true);
    fetch(backendUrl + "/getTweet?id=" + tweetIdRef.current.value)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setPreviewTweetText(res.data.text);
          toast.success("Tweet exist!");
        } else if (res.errors) {
          toast.error(res.errors[0].detail);
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
          ref={tweetIdRef}
        />
        <span onClick={previewTweet} className="px-2 cursor-pointer">
          {previewLoading ? <ClipLoader color="white" size={20} /> : "Preview"}
        </span>
      </label>

      {previewTweetText}

      {previewTweetText && (
        <>
          <label>
            Enter Reply :{" "}
            <textarea
              className="p-2 border-2 border-black"
              onChange={onChangeText}
              ref={textareaRef}
              maxLength="280"
              autoFocus
              cols={screenWidth ? 55 : 35}
            />
          </label>

          {replyLoading ? (
            <div className="text-center">
              <BeatLoader color="white" />
            </div>
          ) : (
            <button className="button" onClick={replyTweet}>
              Reply Tweet
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Reply;
