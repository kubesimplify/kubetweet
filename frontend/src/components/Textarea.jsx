import { useRef } from "react";

export default function Textarea({ id, data, handleChange }) {
  const textareaRef = useRef();

  const screenWidth = window.innerWidth > 425;

  const handleTextarea = (e) => {
    handleChange(e);
    resizeTextArea();
  };

  const resizeTextArea = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + 5 + "px";
  };

  // Destructure the information from `data`
  const { text } = data;

  // Build the Row JSX. Note that we add the
  // id as a data attribute on the textarea element
  return (
    <>
      <label>
        Text :{" "}
        <textarea
          name="text"
          onChange={handleTextarea}
          ref={textareaRef}
          autoFocus
          data-id={id}
          maxLength={280}
          className="p-2 h-auto border-2 border-black rounded-lg"
          value={text}
          cols={screenWidth ? 55 : 35}
        />
      </label>
    </>
  );
}
