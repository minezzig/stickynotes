import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Note({ notes, setNotes, category }) {
  const [editItem, setEditItem] = useState({});

  // delete a note
  const handleDelete = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
  };

  // allow the note input to be edited
  const handleEdit = (e) => {
    setEditItem((prevEditItem) => ({
      ...prevEditItem,
      [e.target.name]: e.target.value,
    }));
  };

  // save the new edited note and replace the original
  const handleSaveEdit = () => {
    const newNotesList = notes.map((note) =>
      note.id === editItem.id ? editItem : note
    );
    setNotes(newNotesList);
    setEditItem({});
  };

  // if the note is completed, change completed status and move it to the end of the array
  const toggleComplete = (id) => {
    const found = notes.find((note) => note.id === id);
    found.completed = !found.completed;
    const i = notes.indexOf(found);
    const newOrder = [...notes];
    found.completed
      ? newOrder.push(...newOrder.splice(i, 1))
      : newOrder.unshift(...newOrder.splice(i, 1));
    setNotes(newOrder);
  };

  // *** RENDER DIFFERENT NOTE DEPENDING ON THE TYPE REQUIRED
  // return a regular note
  const renderNote = (note) => {
    return (
      <div key={note.id} className={`note ${note.category}`}>
        <div className="item-content">
          <div className="date-time">
            <div>{new Date(note.timestamp).toLocaleDateString()}</div>
            <div>{`${new Date(note.timestamp).getHours()}:${new Date(
              note.timestamp
            )
              .getMinutes()
              .toString()
              .padStart(2, "0")}`}</div>
          </div>
          <p
            style={{
              textDecoration: `${note.completed ? "line-through" : "none"}`,
            }}
          >
            {note.text}
          </p>

          <div className="item-buttons">
            <button
              type="button"
              onClick={() => setEditItem(note)}
              className="btn"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
              type="button"
              onClick={() => toggleComplete(note.id)}
              className="btn"
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              type="button"
              onClick={() => handleDelete(note.id)}
              className="btn"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // return a note that is in edit mode
  const renderEditNote = (note) => {
    return (
      <div key={note.id} className={`note ${note.category}`}>
        <div className="item-content">
          <select
            className="edit-select"
            name="category"
            value={editItem.category}
            onChange={handleEdit}
            required
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="appointment">Appointment</option>
          </select>
          <textarea
            className="edit-textarea"
            name="text"
            value={editItem.text}
            onChange={handleEdit}
            rows={editItem.text.split("").length / 20}
          />
          <br />
          <button
            type="button"
            className="form-button"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {notes.map(
        (note) =>
          (category === "all" || category === note.category) &&
          (editItem.id !== note.id ? renderNote(note) : renderEditNote(note))
      )}
    </>
  );
}

export default Note;