import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import { toast } from "react-toastify";
import Textarea from "./Textarea";
import { backendUrl } from "../constants/constant";

export default function Thread() {
  // Initialise the tweets as an empty array
  const [tweets, setTweets] = useState([{ text: "" }]);
  const [tweetLoading, setTweetLoading] = useState(false);

  // When the `+` button is clicked, add a new
  // empty object to the tweets
  function addTextarea(e) {
    const object = { text: "" };
    setTweets([...tweets, object]);
  }

  // When the `-` button is clicked,
  // delete the last object in array
  function deleteTextarea(e) {
    if (tweets.length !== 1) {
      const values = [...tweets];
      values.splice(-1);
      setTweets(values);
    }
  }

  // We pass this handler down to the Textarea component
  function handleChange(e) {
    // Check to see if the element that's changed
    // is an textarea
    if (e.target.matches("textarea")) {
      // Get the id from the div dataset
      const { id } = e.currentTarget.dataset;

      // Get the name and value from the changed element
      const { name, value } = e.target;

      // Copy the tweets
      const copy = [...tweets];

      // Create a new object using the object in tweets
      // at index === id, and update the correct property
      const obj = { ...tweets[id], [name]: value };

      // Add that object to the tweets copy
      copy[id] = obj;

      // Finally update the tweets
      setTweets(copy);
    }
  }

  // We now create some rows by mapping
  // over the data and returning an array
  // of components which have an id based
  // on their position in the tweets array, some
  // data contained in the object, and the handler
  function createTextarea(tweets) {
    return tweets.map((obj, i) => {
      return <Textarea key={i} id={i} data={obj} handleChange={handleChange} />;
    });
  }

  const postThread =  () => {
    for (let i = 0; i < tweets.length; i++) {
      if (tweets[i].text.length < 3) {
        toast.warn(`Length of Tweet ${i + 1} is too short.`);
        return;
      }
    }
    setTweetLoading(true);
     fetch(backendUrl + `/thread?threadData=${JSON.stringify(tweets)}`)
      .then((res) => res.json())
      .then((data) => toast.success(data.text))
      .catch((err) => console.log(err))
      .finally(() => setTweetLoading(false));

    setTweets([{ text: "" }]);
  };

  // Check to see if tweets has length, and then
  // create the rows
  return (
    <>
      {tweets?.length && createTextarea(tweets)}

      <div className="self-end">
        {tweets?.length > 1 && (
          <button className="text-xl mr-1" onClick={deleteTextarea}>
            <GrSubtractCircle />
          </button>
        )}
        {tweets[tweets.length - 1]?.text.trim().length > 1 && (
          <button className="text-xl" onClick={addTextarea}>
            <GrAddCircle />
          </button>
        )}
      </div>

      {tweetLoading ? (
        <div className="text-center">
          <BeatLoader color="white" />
        </div>
      ) : (
        <button className="button" onClick={postThread}>
          Post Thread Now
        </button>
      )}
    </>
  );
}
