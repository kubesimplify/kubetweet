import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import { toast } from "react-toastify";
import Textarea from "./Textarea";
import { backendUrl } from "../constants/constant";

export default function Thread() {
  // Initialise the state as an empty array
  const [state, setState] = useState([{ text: "" }]);
  const [tweetLoading, setTweetLoading] = useState(false);

  // When the `+` button is clicked, add a new
  // empty object to the state
  function addRow(e) {
    const object = { text: "" };
    setState([...state, object]);
  }

  // When the `-` button is clicked,
  // delete the last object in array
  function deleteRow(e) {
    if (state.length !== 1) {
      const values = [...state];
      values.splice(-1);
      setState(values);
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

      // Copy the state
      const copy = [...state];

      // Create a new object using the object in state
      // at index === id, and update the correct property
      const obj = { ...state[id], [name]: value };

      // Add that object to the state copy
      copy[id] = obj;

      // Finally update the state
      setState(copy);
    }
  }

  // We now create some rows by mapping
  // over the data and returning an array
  // of components which have an id based
  // on their position in the state array, some
  // data contained in the object, and the handler
  function createTextarea(state) {
    return state.map((obj, i) => {
      return <Textarea key={i} id={i} data={obj} handleChange={handleChange} />;
    });
  }

  const postThread =  () => {
    for (let i = 0; i < state.length; i++) {
      if (state[i].text.length < 3) {
        toast.warn(`Length of Tweet ${i + 1} is too short.`);
        return;
      }
    }
    setTweetLoading(true);
     fetch(backendUrl + `/thread?threadData=${JSON.stringify(state)}`)
      .then((res) => res.json())
      .then((data) => toast.success(data.text))
      .catch((err) => console.log(err))
      .finally(() => setTweetLoading(false));

    setState([{ text: "" }]);
  };

  // Check to see if state has length, and then
  // create the rows
  return (
    <>
      {state?.length && createTextarea(state)}

      <div className="self-end">
        {state?.length > 1 && (
          <button className="text-xl mr-1" onClick={deleteRow}>
            <GrSubtractCircle />
          </button>
        )}
        {state[state.length - 1]?.text.trim().length > 1 && (
          <button className="text-xl" onClick={addRow}>
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
