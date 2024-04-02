import { useState } from "react";
import { createNote } from "./utils/api";

function Form({ textInput, setTextInput, loadNotes }) {
  const [error, setError] = useState(false);

  // allow for input data
  const handleChange = (e) => {
    setTextInput({
      ...textInput,
      [e.target.name]: e.target.value,
    });
  };

  // save note entry in state or set Error
  const handleSave = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (!textInput.category || !textInput.text) {
      setError(true);
      return;
    }
    try {
      await createNote(textInput, { signal }); // call API to set note
      loadNotes();
      setTextInput({ category: "", text: "" });
      dropDown() 
      setError(false);
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  };

  // clear form
  const handleReset = () => {
    setTextInput({
      category: "",
      text: "",
      completed: false,
      isEditing: false,
    });
  };

  function dropDown() {
    document.querySelector(".form-container").classList.toggle("dropdown")
  }
  return (<div>
    
      <p className="dropdown-click"onClick={dropDown} style={{cursor: "pointer"}}>⬇️ New stickyNote</p>
      <div className="form-container">
        <select
          name="category"
          value={textInput.category}
          onChange={handleChange}
        >
          <option value="" disabled>
            Category
          </option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="appointment">Appointment</option>
        </select>
        {error && (
          <span className="error">
            ...we need all of the information to post!
          </span>
        )}
        <textarea
          className="form-textarea"
          name="text"
          value={textInput.text}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="write your sticky note..."
        />
        <div className="buttons-container">
          <button type="button" className="form-button" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="form-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
  </div>
  );
}

export default Form;
