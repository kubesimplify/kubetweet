import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { backendUrl } from "../constants/constant";

const ScheduleTweet = () => {
  const [tweetText, setTweet] = useState("");
  const [image, setImage] = useState(null);
  const [tweetLoading, setTweetLoading] = useState(false);
  const imageRef = useRef();
  const scheduleRef = useRef();
  const textareaRef = useRef();

  const resizeTextArea = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + 5 + "px";
  };

  const reset = () => {
    emptyFile();
    setTweet("");
    textareaRef.current.value = null;
  };

  const onChangeText = (e) => {
    setTweet(e.target.value);
    resizeTextArea();
  };

  const onChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const emptyFile = () => {
    imageRef.current.value = null;
    setImage(null);
  };

  const ScheduleTweet = () => {
    if (textareaRef.current.value.length < 5) {
      toast.warn("Length of tweet is too short.");
      return;
    }
    setTweetLoading(true);
    const time = scheduleRef.current.value;
    const text = encodeURIComponent(tweetText);

    fetch( backendUrl + `/schedule?text=${text}&scheduleDate=${time}`)
      .then((res) => res.text())
      .then((text) => toast.success(text))
      .catch((err) => {
        toast.error("Something went Wrong 😔");
      })
      .finally(() => {
        setTweetLoading(false);
      });
      reset()
  };
  return (
    <>
      <label>
        Enter Text :{" "}
        <textarea
          className="p-2 border-2 border-black"
          onChange={onChangeText}
          ref={textareaRef}
          maxLength="280"
          cols="35"
        />
      </label>

      <label>
        Upload File :{" "}
        <input
          type="file"
          name="myImage"
          ref={imageRef}
          onChange={onChangeImage}
        />
      </label>

      {image && (
        <div className="relative">
          <span className="cursor-pointer" onClick={emptyFile}>
            X
          </span>
          <img
            className="w-full max-h-40 object-cover rounded-lg"
            src={URL.createObjectURL(image)}
            alt=""
          />
        </div>
      )}
      <label>
        Schedule Tweet :{" "}
        <input
          className="p-2 border-2 border-black rounded-lg"
          type="text"
          ref={scheduleRef}
          defaultValue={new Date().toLocaleString("en-US", {
            timeZone: "Asia/Calcutta",
          })}
        />
      </label>
      {tweetLoading ? (
        <div className="text-center">
          <BeatLoader color="white" />
        </div>
      ) : (
        <button
          className="shadow-slate-600/40 shadow-lg bg-white text-blue-500 font-bold rounded-lg p-2"
          onClick={() => ScheduleTweet()}
        >
          Schedule Tweet
        </button>
      )}
    </>
  );
};

export default ScheduleTweet;
