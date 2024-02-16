import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

function Form({ textInput, setTextInput, setNotes }) {
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setTextInput({
      ...textInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!textInput.category || !textInput.text) {
      setError(true);
      return;
    }
    const newNote = {
      id: uuidv4(),
      timestamp: new Date(),
      ...textInput,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setTextInput({ category: "", text: "", completed: false, isEditing: false });
    setError(false);
  };

  const handleReset = () => {
    setTextInput({ category: "", text: "", completed: false, isEditing: false });
  };

  return (
    <div>
      <select name="category" value={textInput.category} onChange={handleChange}>
        <option value="" disabled>
          Catagory
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
        rows="5"
        name="text"
        value={textInput.text}
        onChange={handleChange}
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
  );
}

export default Form;
